const axios = require("axios");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("bson");
const sessionAttendanceModel = require("./models/sessionAttendanceModel");
const studentSchoolModel = require("./models/studentSchoolModel");
const schoolModel = require("./models/schoolModel");
const studentModel = require("./models/studentModel");
const alertModel = require("./models/alertModel");
const caseModel = require("./models/caseModel");
const classStudentSchoolModel = require("./models/classStudentSchoolModel");
const groupStudentSchoolModel = require("./models/groupStudentSchoolModel");
const studentSchoolResultModel = require("./models/studentSchoolResultModel");

async function reassignCollections(previousStudentID, currentStudentID) {
	const models = [
		alertModel,
		caseModel,
		classStudentSchoolModel,
		groupStudentSchoolModel,
		studentSchoolResultModel,
	];

	for (const model of models) {
		const previousDocuments = await model.find({
			student_school: previousStudentID,
		});

		if (previousDocuments.length > 0) {
			const modelName = model.collection.collectionName;
			if (modelName === "alerts" || modelName === "cases") {
				await model.updateMany(
					{ student_school: previousStudentID },
					{ $set: { student_school: currentStudentID } }
				);
			} else if (
				modelName === "classes_students_schools" ||
				modelName === "groups_students_schools"
			) {
				await model.deleteMany({ student_school: previousStudentID });
			}
		}
	}
}

async function attendanceCombination(
	previousStudentID,
	currentStudentID,
	schoolID
) {
	try {
		const previousStudentAttendance = await sessionAttendanceModel.find({
			student_school: previousStudentID,
			school: schoolID,
		});

		const currentStudentAttendance = await sessionAttendanceModel.find({
			student_school: currentStudentID,
			school: schoolID,
		});

		let operations = [];

		previousStudentAttendance.forEach((record) => {
			const existsInCurrent = currentStudentAttendance.some(
				(currentRecord) =>
					currentRecord.date.date.getTime() === record.date.date.getTime() &&
					currentRecord.session === record.session
			);
			if (!existsInCurrent) {
				operations.push({
					updateOne: {
						filter: { _id: record._id },
						update: { $set: { student_school: currentStudentID } },
					},
				});
			}
		});

		if (operations.length > 0) {
			await sessionAttendanceModel.bulkWrite(operations);
		}

		await sessionAttendanceModel.deleteMany({
			student_school: previousStudentID,
			school: schoolID,
		});
	} catch (error) {
		console.error("Error combining, updating, or deleting attendance:", error);
		throw error;
	}
}

async function mainFunction(schoolID) {
	try {
		// connect to mongo
		const endpoint =
			"mongodb+srv://foresight-live-app:deLWL5KzAWlsQttR@foresight.rsaxs.mongodb.net/foresight?retryWrites=true&w=majority";
		await mongoose.connect(endpoint, { useNewUrlParser: true });
		console.log("Connected to MongoDB");

		// current students are dictated by having upn stored on their records as they have been added in latest sync release

		const currentStudents = await studentSchoolModel.find({
			school: schoolID,
			upn: { $exists: true },
		});

		const previousStudents = await studentSchoolModel
			.find({
				school: schoolID,
				upn: { $exists: false },
			})
			.populate("student");
		let remainingStudents = currentStudents.length;
		for (const currentStudent of currentStudents) {
			const matchedPreviousStudentSchool = previousStudents.find(
				(previousStudent) =>
					previousStudent.student &&
					previousStudent.student.upn === currentStudent.upn
			);

			if (matchedPreviousStudentSchool) {
				await studentSchoolModel.updateOne(
					{ _id: currentStudent._id }, // Filter criteria
					{ $set: { past_id: matchedPreviousStudentSchool._id } } // Update operation
				);
				await reassignCollections(
					matchedPreviousStudentSchool._id,
					currentStudent._id
				);
				await attendanceCombination(
					matchedPreviousStudentSchool._id,
					currentStudent._id,
					schoolID
				);
				await studentSchoolModel.deleteOne(
					{ _id: matchedPreviousStudentSchool._id } // Filter criteria
				);
				remainingStudents--;
				console.log(remainingStudents);
			} else {
				console.log(`No match found for UPN: ${currentStudent.upn}`);
			}
		}
	} catch (error) {
		console.error("Error:", error);
		await mongoose.disconnect();
	}
	await mongoose.disconnect();
}

async function runFunction() {
	await mainFunction(new ObjectId("64edc4f9663951057a221009"));
}
runFunction();

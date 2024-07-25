const mongoose = require("mongoose");

const studentSchoolResultSchema = new mongoose.Schema({
	assessment_result: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AssessmentResult",
		index: true,
	},
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
		index: true,
	},
	result: { type: String },
	type: { type: String },
	subject: { type: String },
	grade_value: { type: String },
});

const StudentSchoolResult = mongoose.model(
	"StudentSchoolResult",
	studentSchoolResultSchema,
	"students_schools_results"
);

module.exports = StudentSchoolResult;

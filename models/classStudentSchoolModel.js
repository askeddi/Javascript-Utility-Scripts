const mongoose = require("mongoose");

const classStudentSchoolSchema = new mongoose.Schema({
	class: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "classes",
		index: true,
	},
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "students_schools",
		index: true,
	},
	start_date: Date,
	end_date: Date,
});

const ClassStudentSchool = mongoose.model(
	"ClassStudentSchool",
	classStudentSchoolSchema,
	"classes_students_schools"
);

module.exports = ClassStudentSchool;

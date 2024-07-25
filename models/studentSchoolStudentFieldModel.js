const mongoose = require("mongoose");

const studentSchoolStudentFieldSchema = new mongoose.Schema({
	_id: Object,
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
	},
	student_field: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentField",
	},
	value: String,
	created_at: Date,
	updated_at: Date,
	manually_entered: Boolean,
});

const StudentSchoolStudentField = mongoose.model(
	"StudentSchoolStudentField",
	studentSchoolStudentFieldSchema,
	"students_schools_student_fields"
);

module.exports = StudentSchoolStudentField;

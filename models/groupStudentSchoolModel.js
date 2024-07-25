const mongoose = require("mongoose");

const groupStudentSchoolSchema = new mongoose.Schema({
	group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Group",
		index: true,
	},
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
		index: true,
	},
	start_date: Date,
	end_date: Date,
});

const GroupStudentSchool = mongoose.model(
	"GroupStudentSchool",
	groupStudentSchoolSchema,
	"groups_students_schools"
);

module.exports = GroupStudentSchool;

const mongoose = require("mongoose");

const studentSchoolSchema = new mongoose.Schema({
	_id: Object,
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
	},
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
	},
	phase: String,
	wonde: { id: String },
	upn: String,
	past_id: Object,
	attendance_summary: {
		percentage_present: Number,
		percentage_absence: Number,
		percentage_authorised: Number,
		percentage_unauthorised: Number,
		percentage_late_present: Number,
		percentage_late_unauthorised: Number,
		present: Number,
		unauthorized_absences: Number,
		authorised_absences: Number,
		late_before_registration: Number,
		late_after_registration: Number,
		possible_marks: Number,
		absences: Number,
	},
	created_at: Date,
	updated_at: Date,
});

const StudentSchool = mongoose.model(
	"StudentSchool",
	studentSchoolSchema,
	"students_schools"
);

module.exports = StudentSchool;

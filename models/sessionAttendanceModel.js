const mongoose = require("mongoose");

const sessionAttendanceSchema = new mongoose.Schema({
	_id: Object,
	attendance_code: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AttendanceCode",
	},
	wonde: { id: String },
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
	},
	session: String,
	date: { date: Date },
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
	},
	created_at: Date,
	updated_at: Date,
});

const SessionAttendance = mongoose.model(
	"SessionAttendance",
	sessionAttendanceSchema,
	"session_attendances"
);
module.exports = SessionAttendance;

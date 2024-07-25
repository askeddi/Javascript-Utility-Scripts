const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	_id: Object,
	upn: String,
	dob: Date,
	created_at: Date,
	updated_at: Date,
});

const Student = mongoose.model("Student", studentSchema, "students");

module.exports = Student;

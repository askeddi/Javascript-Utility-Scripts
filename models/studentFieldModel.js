const mongoose = require("mongoose");

const studentField = new mongoose.Schema({
	_id: Object,
	name: String,
	created_at: Date,
	updated_at: Date,
});

const StudentField = mongoose.model(
	"StudentField",
	studentField,
	"student_fields"
);

module.exports = StudentField;

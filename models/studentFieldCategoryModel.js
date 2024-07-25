const mongoose = require("mongoose");

const studentFieldCategory = new mongoose.Schema({
	_id: Object,
	name: String,
	school_group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SchoolGroup",
	},
	created_at: Date,
	updated_at: Date,
});

const StudentFieldCategory = mongoose.model(
	"StudentFieldCategory",
	studentFieldCategory,
	"student_field_categories"
);

module.exports = StudentFieldCategory;

const mongoose = require("mongoose");

const SchoolGroupSchoolSchema = new mongoose.Schema({
	_id: Object,
	school_group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SchoolGroup",
	},
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
	},
	created_at: Date,
	updated_at: Date,
});

const SchoolGroupSchool = mongoose.model(
	"SchoolGroupSchool",
	SchoolGroupSchoolSchema,
	"school_groups_schools"
);

module.exports = SchoolGroupSchool;

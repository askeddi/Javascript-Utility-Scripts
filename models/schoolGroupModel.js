const mongoose = require("mongoose");

const schoolGroupSchema = new mongoose.Schema({
	_id: Object,
	name: String,
	created_at: Date,
	updated_at: Date,
});

const SchoolGroup = mongoose.model(
	"SchoolGroup",
	schoolGroupSchema,
	"school_groups_schools"
);

module.exports = SchoolGroup;

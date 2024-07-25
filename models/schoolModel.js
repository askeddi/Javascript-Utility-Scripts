const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
	_id: Object,
	urn: String,
	la_code: String,
	establishment_number: String,
	establishment_name: String,
	wonde: { id: String },
	last_data_sync: Date,
	created_at: Date,
	updated_at: Date,
});

const School = mongoose.model("School", schoolSchema, "schools");

module.exports = School;

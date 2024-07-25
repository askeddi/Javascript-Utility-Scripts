const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
	//the school that created this alert
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
		index: true,
	},
	school_group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SchoolGroup",
		index: true,
	},
	for_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
		index: true,
	},
	for_school_group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SchoolGroup",
		index: true,
	},
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
		index: true,
	},
	alert_type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AlertType",
	},
	case: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Case",
	},
	read_by_school_group: { type: Boolean, index: true },
	read_by_school: { type: Boolean, index: true },
});

const Alert = mongoose.model("Alert", alertSchema, "alerts");

module.exports = Alert;

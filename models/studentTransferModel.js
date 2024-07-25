const mongoose = require("mongoose");

const studentTransferSchema = new mongoose.Schema({
	//the school that the student is transferring to
	from_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
		index: true,
	},
	//the school that is being requested for the student transfer
	to_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
		index: true,
	},
	//the student school record that comes form the school that the student is being transferred from
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
		index: true,
	},
});

const StudentTransfer = mongoose.model(
	"StudentTransfer",
	studentTransferSchema,
	"student_transfers"
);

module.exports = StudentTransfer;

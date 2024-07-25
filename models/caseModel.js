const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
	//if the case if being edited this stores the id of the user currently editing it. If it is null it means it is not being currently edited
	current_user_editing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	version_of_case: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Case",
		index: true,
	},
	//if the case is for a school
	school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
		index: true,
	},
	//if the case is for a school group
	school_group: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SchoolGroup",
		index: true,
	},
	academic_year: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "AcademicYear",
		index: true,
	},
	//the student the case is for
	student_school: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "StudentSchool",
		index: true,
	},
	closed: { type: Boolean },
	reopened: { type: Boolean },
	case_stage: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CaseStage",
		index: true,
	},

	//for the checkbox for if case is an attendance concern or not
	attendance_concern: { type: Boolean, index: true },

	//for the school to make suitable arrangements(suspension)
	school_will_make_arrangements: { type: Boolean, index: true },

	//'exclusion' or 'suspension'
	case_type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CaseType",
		index: true,
	},
	//auto incrementing unique case id
	case_id: {
		type: String,
	},
	//1 = Emergency or 2 = Standard
	priority: { type: Number },
	//'Attenance', 'Behaviour', or 'Attainment'
	inclusion_matters_type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "InclusionMattersType",
	},
	//the date of the incident that the case is for
	incident_date: Date,
	incident_reported_date: Date,

	//for the checkbox for if eip has agreed to review the case or not
	eip_agreed_to_review: { type: Boolean, index: true },

	details: {
		type: String,
	},

	//For if the user tyes in a custom assesment into the 'other field'
	other_assessment: {
		type: String,
	},
	//For if the user tyes in a custom intervention into the 'other field'
	other_intervention: {
		type: String,
	},

	// Stage 2
	further_details: {
		type: String,
	},

	additional_comments: {
		type: String,
	},
	additional_comments_stage_6: {
		type: String,
	},
	//the panel that the case needs to be sent to
	case_panel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Form",
	},
	case_panel_form: String,
	//evaluation of impact form status storing
	case_eif_form: String,
	//the hearing date for the panel
	hearing_date: Date,
	//for the checkbox at the review stage
	is_application_valid: { type: Boolean, index: true },
	draft: { type: Boolean, index: true },
	is_application_valid_signed_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		index: true,
	},
	//this is for when the school group review and agrees to progress with this case
	reviewed: { type: Boolean, index: true },
	//the review date for the panel
	review_date: Date,
	case_status: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CaseStatus",
	},

	//the placement decision or the case at school group level
	case_placement_decision: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CasePlacementDecision",
	},

	suspension_details: {
		type: String,
	},
	suspension_start_date: Date,
	suspension_start_session: { type: String },
	suspension_end_date: Date,
	suspension_end_session: { type: String },
	suspension_return_date: Date,
	suspension_return_session: { type: String },
	suspension_will_miss_exams: { type: Boolean },
	chair_of_governor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ChairOfGovernor",
	},
	suspension_comments: {
		type: String,
	},
	suspension_is_lac: { type: Boolean },
	virtual_school_head: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "VirtualSchoolHead",
	},
	lac_date_of_provision: Date,
	lac_suitable_arrangements: { type: String },
	suspension_has_social_worker: { type: Boolean },
	social_worker: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "SocialWorker",
	},
	school_has_requested_eip_funded_support: { type: Boolean },

	//new fields
	eip_has_agreed_to_priority_change: { type: Boolean },
	internal_review_date: Date,
	actions_following_internal_review: {
		type: String,
	},
	is_provision_suitable: { type: Boolean },
	is_provision_commenced: { type: Boolean },
	provision_details: { type: String },
	is_placement_reviewed: { type: Boolean },
	placement_review_date: Date,
	panel_hearing_date: Date,
	provision_review_date: Date,
	panel_decision: { type: String },
	information_submitted_to_panel: { type: String },
	has_provision_changed: { type: String },
	exclusion_start_date: Date,

	panel_review_date: Date,

	application_form_correctly_completed: { type: Boolean },
	panel_decision_made: { type: Boolean },
	provision_agreed: { type: Boolean },
	feedback: { type: String },
	//Stage 7 Provision Dates
	provision_start_date: Date,
	provision_end_date: Date,
});

const Case = mongoose.model("Case", caseSchema, "cases");

module.exports = Case;

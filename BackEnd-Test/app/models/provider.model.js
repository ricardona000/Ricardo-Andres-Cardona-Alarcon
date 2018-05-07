const mongoose = require('mongoose');

const ProviderSchema = mongoose.Schema({
    firstName: String
    , lastName: String
	, middleName: String
	, email: String
	, projectedStartDate: Date
	, employerId: Number
	, providerType: String
	, staffStatus: String
	, assignedTo: Number
	, status: String
	, createdBy: Number
	, createdAt: Date
	, updatedBy: Number
	, updatedAt: Date
	, specialty: Object
});

module.exports = mongoose.model('Provider', ProviderSchema);

const Provider = require('../models/provider.model.js');

// Create and Save a new Provider
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName) {
        return res.status(400).send({
            message: "Provider first name can not be empty"
        });
    }
	
	if(!req.body.lastName) {
        return res.status(400).send({
            message: "Provider last name can not be empty"
        });
    }

    // Create a Provider
    const provider = new Provider({
        firstName: req.body.firstName
        , lastName: req.body.lastName
		, middleName: req.body.middleName
		, email: req.body.email
		, projectedStartDate: req.body.projectedStartDate
		, employerId: req.body.employerId
		, providerType: req.body.providerType
		, staffStatus: req.body.staffStatus
		, assignedTo: req.body.assignedTo
		, status: req.body.status
		, createdBy: req.body.createdBy
		, createdAt: req.body.createdAt
		, updatedBy: req.body.updatedBy
		, updatedAt: req.body.updatedAt
		/*, specialty: {
			_id: req.body.specialty._id
			, name: req.body.specialty.name
			, createdBy: req.body.specialty.createdBy
			, createdAt: req.body.specialty.createdAt
			, updatedBy: req.body.specialty.updatedBy
			, updatedAt: req.body.specialty.updatedAt
		}*/
    });

    // Save Provider in the database
    provider.save()
    .then(data => {
        //res.send(data);
		res.redirect('/');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Provider."
        });
    });
};

// Retrieve and return all providers from the database.
exports.findAll = (req, res) => {
    Provider.find()
    .then(providers => {
        //res.send(providers);
		res.render('index.ejs', {providers : providers});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving providers."
        });
    });
};

// Find a single provider with an id
exports.findOne = (req, res) => {
    Provider.findById(req.params.id)
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.id
            });            
        }
        //res.send(provider);
		res.render('update.ejs', {provider: provider});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving provider with id " + req.params.id
        });
    });
};

// Update a provider identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName) {
		console.log(req.body);
        return res.status(400).send({
            message: "Provider first name can not be empty"
        });
    }

    // Find provider and update it with the request body
    Provider.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName
        , lastName: req.body.lastName
		, middleName: req.body.middleName
		, email: req.body.email
		, projectedStartDate: req.body.projectedStartDate
		, employerId: req.body.employerId
		, providerType: req.body.providerType
		, staffStatus: req.body.staffStatus
		, assignedTo: req.body.assignedTo
		, status: req.body.status
		, createdBy: req.body.createdBy
		, createdAt: req.body.createdAt
		, updatedBy: req.body.updatedBy
		, updatedAt: req.body.updatedAt
		/*, specialty: {
			_id: req.body.specialty._id
			, name: req.body.specialty.name
			, createdBy: req.body.specialty.createdBy
			, createdAt: req.body.specialty.createdAt
			, updatedBy: req.body.specialty.updatedBy
			, updatedAt: req.body.specialty.updatedAt
		}*/
    }, {new: true})
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.id
            });
        }
        //res.send(provider);
		res.redirect('/providers');
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating provider with id " + req.params.id
        });
    });
};

// Delete a provider with the specified id in the request
exports.delete = (req, res) => {
    Provider.findByIdAndRemove(req.params.id)
    .then(provider => {
        if(!provider) {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.id
            });
        }
        //res.send({message: "Provider deleted successfully!"});
		res.redirect('/providers');
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Provider not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete provider with id " + req.params.id
        });
    });
};

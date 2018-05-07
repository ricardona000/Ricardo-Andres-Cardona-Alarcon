module.exports = (app) => {
    const providers = require('../controllers/provider.controller.js');

    // Create a new Provider
    app.post('/providers', providers.create);

    // Retrieve all Providers
    app.get('/providers', providers.findAll);

    // Retrieve a single Provider with id
    app.get('/providers/:id', providers.findOne);

    // Update a Provider with id
    app.put('/providers/:id', providers.update);
	
	// Update a Provider with id
    app.post('/editProvider/:id', providers.update);

    // Delete a Provider with id
    app.delete('/providers/:id', providers.delete);

    // Delete a Provider with id
    app.post('/deleteProvider/:id', providers.delete);
}
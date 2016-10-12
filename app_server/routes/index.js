var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlOrgs = require('../controllers/organisations');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//organisations
router.get('/organisations', ctrlOrgs.getList);
router.post('/organisations', ctrlOrgs.add);
router.delete('/organisations', ctrlOrgs.delete);
router.put('/organisations', ctrlOrgs.update);

module.exports = router;

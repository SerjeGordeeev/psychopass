const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});

const ctrlProfiles = require('../controllers/profiles');
const ctrlAuth = require('../controllers/authentication');
const ctrlOrgs = require('../controllers/organisations');
const ctrlGroups = require('../controllers/groups');

// profiles
router.get('/profiles', ctrlProfiles.getList);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//organisations
router.get('/organisations', ctrlOrgs.getList);
router.post('/organisations', ctrlOrgs.add);
router.delete('/organisations', ctrlOrgs.delete);
router.put('/organisations', ctrlOrgs.update);

//groups
router.get('/groups', ctrlGroups.getList);
router.post('/groups', ctrlGroups.add);
router.delete('/groups', ctrlGroups.delete);
router.put('/groups', ctrlGroups.update);

module.exports = router;

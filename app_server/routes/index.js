const express = require('express')
const router = express.Router()
const jwt = require('express-jwt')
const auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
})

const ctrlProfiles = require('../controllers/profiles')
const ctrlAuth = require('../controllers/authentication')
const ctrlOrgs = require('../controllers/organisations')
const ctrlGroups = require('../controllers/groups')
const ctrlProps = require('../controllers/props')
const ctrlAdmin = require('../controllers/admin')

// profiles
router.get('/profiles', ctrlProfiles.getList)
router.post('/profiles', ctrlProfiles.add)
router.post('/profiles/upload', ctrlProfiles.upload)
router.delete('/profiles', ctrlProfiles.delete)
router.put('/profiles', ctrlProfiles.update)

// authentication
router.post('/register', ctrlAuth.register)
router.post('/login', ctrlAuth.login)

//organisations
router.get('/organisations', ctrlOrgs.getList)
router.post('/organisations', ctrlOrgs.add)
router.post('/organisations/upload', ctrlOrgs.upload)
router.delete('/organisations', ctrlOrgs.delete)
router.put('/organisations', ctrlOrgs.update)

//groups
router.get('/groups', ctrlGroups.getList)
router.post('/groups', ctrlGroups.add)
router.delete('/groups', ctrlGroups.delete)
router.put('/groups', ctrlGroups.update)

//properties
router.get('/props', ctrlProps.getList)
router.post('/props', ctrlProps.add)
router.delete('/props', ctrlProps.delete)
router.put('/props', ctrlProps.update)

//admin
router.get('/backup', ctrlAdmin.getBDBackup)

module.exports = router

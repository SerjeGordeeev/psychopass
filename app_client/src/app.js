/**
 * TODO Routing, Material, Rest-Angular
 */



require('angular-material')
require('../../node_modules/angular-material/angular-material.min.css')

require('v-accordion')
require('../../node_modules/v-accordion/dist/v-accordion.min.css')

require('ng-file-upload')

const angular = require('angular')
				require('angular-route')

const wpApp = angular.module('wpApp', ['ngMaterial','ngRoute','vAccordion', 'mainLayout', 'auth', 'ngAnimate', 'ngFileUpload'])

require('./auth')(wpApp)


const { Scenes } = require('telegraf');
const divisionStep = require('../scenes/divisionStepScene.scene');
const initStepRoute1 = require('../scenes/initStepRoute1.scene');
const initStepRoute2 = require('../scenes/initStepRoute2.scene');

const routeScene = new Scenes.WizardScene('ROUTE_WIZARD_ID', divisionStep, initStepRoute1, initStepRoute2)

module.exports = routeScene

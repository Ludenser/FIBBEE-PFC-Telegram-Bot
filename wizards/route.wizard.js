const
    { Scenes } = require('telegraf'),
    firstStep = require('../scenes/firstScene.scene'),
    stepRoute1 = require('../scenes/stepRoute1.scene'),
    stepRoute2 = require('../scenes/stepRoute2.scene'),
    sendMessageError = require('../utils/sendMessageError'),
    sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu');

const routeScene = new Scenes.WizardScene('ROUTE_WIZARD_ID', firstStep, stepRoute1, stepRoute2)

module.exports = routeScene
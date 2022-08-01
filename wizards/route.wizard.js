const { Scenes } = require('telegraf');
const divisionStep = require('../scenes/divisionStepScene.scene');
const initStepRoute1 = require('../scenes/initStepRoute1.scene');
const initStepRoute2 = require('../scenes/initStepRoute2.scene');

/**
  * Конструктор распределительной сцены
  */

const initialScene = (ctx) => {

  return new Scenes.WizardScene('INITIAL_WIZARD_ID', ...divisionStep(ctx), initStepRoute1, initStepRoute2)
}

module.exports = initialScene

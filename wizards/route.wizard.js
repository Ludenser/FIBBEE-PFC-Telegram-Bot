const { Scenes } = require('telegraf');
const divisionStep = require('../scenes/divisionStepScene.scene');
const initStepScene = require('../scenes/initStepScene.scene');

/**
  * Конструктор распределительной сцены
  */

const initialScene = (ctx) => {

  return new Scenes.WizardScene('INITIAL_WIZARD_ID', ...divisionStep(ctx), ...initStepScene(ctx))

}

module.exports = initialScene

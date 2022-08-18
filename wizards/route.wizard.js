const { Scenes } = require('telegraf');
const divisionStep = require('../scenes/divisionStepScene.scene');
const initStepScene = require('../scenes/initStepScene.scene');
const empty_step = require('../scenes/emptyStep.scene')

/**
  * Конструктор распределительной сцены
  */

const initialScene = (ctx) => {
  if (ctx.session.all_lists) {
    return new Scenes.WizardScene('INITIAL_WIZARD_ID', ...divisionStep(ctx), ...initStepScene(ctx))
  } else {
    return new Scenes.WizardScene('INITIAL_WIZARD_ID', empty_step())
  }

}

module.exports = initialScene

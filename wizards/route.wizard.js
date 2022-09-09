const { Scenes } = require('telegraf');
const divisionStep = require('../scenes/DivisionStepScene/index');
const initStepScene = require('../scenes/InitStepScene/index');

/**
  * Конструктор распределительной сцены
  */

const initialScene = () => {

  return new Scenes.WizardScene('INITIAL_WIZARD_ID', divisionStep, initStepScene)

}

module.exports = initialScene

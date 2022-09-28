const { Composer, Scenes } = require('telegraf');
const complexScene = require('../../../wizards/complex.wizard');
const initialScene = require('../../../wizards/route.wizard');

/**
  * Динамическое создание Wizard`а со сценами из таск.листа ClickUp.
  * 
  * Главная регистрация всех сцен бота.
  */
module.exports = (ctx) => {

  const totalSceneInitComposer = new Composer();
  const stage = new Scenes.Stage([initialScene(), ...complexScene(ctx)])

  totalSceneInitComposer.use(stage.middleware())
  return totalSceneInitComposer
}
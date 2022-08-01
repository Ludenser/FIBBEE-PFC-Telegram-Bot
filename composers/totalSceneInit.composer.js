const { Composer, Scenes } = require('telegraf');
const complexScene = require('../wizards/complex.wizard');
const initialScene = require('../wizards/route.wizard');

module.exports = (ctx) => {

  const totalSceneInitComposer = new Composer();
  const stage = new Scenes.Stage([initialScene(ctx), ...complexScene(ctx)])

  totalSceneInitComposer.use(stage.middleware())

  return totalSceneInitComposer
}
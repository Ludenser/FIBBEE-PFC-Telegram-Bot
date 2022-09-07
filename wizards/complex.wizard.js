const { Scenes } = require('telegraf');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
_ = require('lodash');
const complex_scene = require('../scenes/complex.scene');

/**
  * Сцена инициализации роутов.
  */
const complexScene = (ctx) => {

  const wizardScene = _(ctx.session.all_lists)
    .map((list, i) => {


      return new Scenes.WizardScene(`${ctx.session.all_lists[i].scene_id}`, ...complex_scene(ctx.session.all_lists[i].tasksWithoutDriverTaskAndSide, list.driverTask[0], ctx.session))

    })

  return wizardScene
}

module.exports = complexScene
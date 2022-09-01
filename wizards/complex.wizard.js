const { Scenes } = require('telegraf');
_ = require('lodash');
const complex_scene = require('../scenes/complex.scene');

/**
  * Сцена инициализации роутов.
  */
const complexScene = (ctx) => {

  const wizardScene = _(ctx.session.all_lists)
    .map((list, i) => {

      return new Scenes.WizardScene(`ROUTE_${i}_WIZARD_ID`, ...complex_scene(ctx.session.all_lists[i].tasksWithoutDriverTask, list.driverTask[0], ctx.session))
    })

  return wizardScene
}

module.exports = complexScene
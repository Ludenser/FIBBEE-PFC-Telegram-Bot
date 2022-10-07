const { Scenes } = require('telegraf');
_ = require('lodash');
const complex_scene = require('../scenes/ComplexScene/index')


/**
  * Сцена инициализации роутов.
  */
const complexScene = (ctx) => {

  const wizardScene = _(ctx.session.all_lists)
    .map((list, i) => {


      return new Scenes.WizardScene(`${i}`, ...complex_scene(ctx.session.all_lists[i].tasksWithoutDriverTaskAndSide, list.driverTask[0], ctx.session))

    })
.value()
  return wizardScene
}

module.exports = complexScene
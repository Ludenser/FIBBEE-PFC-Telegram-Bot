const { Scenes } = require('telegraf');
_ = require('lodash');
const complex_scene = require('../scenes/complex.scene');

/**
  * Сцена инициализации назначенного роута.
  */
const complexScene = (ctx) => {

  const wizardScene = _(ctx.session.all_lists)
    .map((list, i) => {
      // ctx.session.all_lists[i].tasksWithoutMain.forEach((el, i) => {
      //   console.log(el.name)
      // })
      return new Scenes.WizardScene(`ROUTE_${i}_WIZARD_ID`, ...complex_scene(ctx.session.all_lists[i].tasksWithoutMain, list))
    })

  return wizardScene
}

module.exports = complexScene
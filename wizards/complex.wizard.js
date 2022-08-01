const { Scenes } = require('telegraf');
const complex_scene = require('../scenes/complex.scene');

/**
  * Сцена инициализации назначенного роута.
  */
const complexScene = (ctx) => {

  const wizardScene = ctx.session.all_lists.map((element, i) => {
    return new Scenes.WizardScene(`ROUTE_${i}_WIZARD_ID`, ...complex_scene(ctx.session.all_lists[i].tasksWithoutMain))
  })

  return wizardScene
}

module.exports = complexScene
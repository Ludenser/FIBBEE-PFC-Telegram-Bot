const { Scenes } = require('telegraf');

module.exports = new Scenes.WizardScene(
  'route2Wizard',
  async (ctx) => {
    try {
      console.log(ctx, '2 сцена')
      return ctx.wizard.next()
    } catch (error) {
      msgError(ctx)
    }
  }

)


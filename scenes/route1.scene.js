const { Scenes } = require('telegraf'),
  msgError = require('../utils/sendMessageError');

module.exports = new Scenes.WizardScene(
  'route1Wizard',
  async (ctx) => {
    try {
      console.log(ctx, '1 сцена')
      return ctx.wizard.next()
    } catch (error) {
      msgError(ctx)
    }
  }

)
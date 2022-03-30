const { Scenes } = require('telegraf'),
  sendMessageError = require('../utils/sendMessageError');
const sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu');

module.exports = new Scenes.WizardScene(
  'ROUTE_2_WIZARD_ID',
  async (ctx) => {
    try {
      console.log(ctx, '2 сцена')
      sendMessageInit(ctx)
      return ctx.wizard.next()
    } catch (e) {
      console.log(e)
      sendMessageError(ctx, e)
    }
  }

)


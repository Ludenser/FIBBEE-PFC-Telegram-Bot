const { Scenes } = require('telegraf'),
  sendMessageError = require('../utils/sendMessageError'),
  sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu');

module.exports = new Scenes.WizardScene(
  'ROUTE_1_WIZARD_ID',
  async (ctx) => {
    console.log('ты в сцене 1')
    sendMessageInit(ctx)
    return ctx.wizard.next()
  },
  async (ctx) => {
    try {

    } catch (error) {
      sendMessageError(ctx, e)
    }
  }

)
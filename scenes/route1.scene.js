const { Scenes } = require('telegraf'),
  sendMessageError = require('../utils/sendMessageError'),
  sendMessageInit = require('../routeMenu/sendMessageInit.routeMenu');

module.exports = new Scenes.WizardScene(
  'ROUTE_1_WIZARD_ID',
  async (ctx) => {
    console.log('ты в сцене 1')
    await sendMessageInit(ctx)
    return await ctx.scene.leave()
  },
  async (ctx) => {
    try {
      console.log('step 2')
      return ctx.scene.leave()
    } catch (error) {
      sendMessageError(ctx, e)
    }
  }

)
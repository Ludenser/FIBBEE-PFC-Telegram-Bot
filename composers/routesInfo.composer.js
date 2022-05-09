const { Composer } = require('telegraf'),
  sendMessageRoutesInfo = require('../keyboards/mainMenu/sendMessageRoutesInfo'),
  sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageRoutesInfo(ctx)
  } catch (e) {
    console.log(e)
    sendMessageError(ctx, e)
  }

})

module.exports = composer
const { Composer } = require('telegraf');
const
  sendMessageRoutesInfo = require('../menu/sendMessageRoutesInfo'),
  sendMessageError = require('../utils/sendMessageError');

const composer = new Composer();

composer.action('routesInfo', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageRoutesInfo(ctx)
  } catch (e) {
    sendMessageError(ctx, e)
  }

})

module.exports = composer
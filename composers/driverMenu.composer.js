const { Composer } = require('telegraf');
const sendMessageDriverMenu = require('../menu/sendMessageDriverMenu')

const composer = new Composer();

composer.action('driverMenu', async (ctx) => {
  try {
    await ctx.deleteMessage()
    sendMessageDriverMenu(ctx)
  } catch (error) {
    ctx.reply(error)
  }

})

module.exports = composer
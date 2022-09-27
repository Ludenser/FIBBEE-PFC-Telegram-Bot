const { Composer } = require('telegraf');
const { altModeComposerActions: Actions } = require('../actions');
const sendMessageAltMode = require('../keyboards/sendMessageAltMode.keyboard');
const sendMessageDriverMenu = require('../keyboards/sendMessageDriverMenu.keyboard');
const { sendError } = require('../../../utils/sendLoadings');

module.exports = (ctx) => {
  const composer = new Composer()

  composer.action(Actions.MODE_CHANGE, async (ctx) => {
    try {
      await ctx.deleteMessage()
      await sendMessageAltMode(ctx)

    } catch (e) {
      await sendError(ctx, e)
      await sendMessageDriverMenu(ctx)
    }

  })
  ctx.session.all_lists.forEach((list, i) => {
    composer.action(`${Actions.ACTION_SNIP}${i}`, (ctx) => {
      ctx.reply(`Hi this is ${i}`)
    })
  })
  return composer
}

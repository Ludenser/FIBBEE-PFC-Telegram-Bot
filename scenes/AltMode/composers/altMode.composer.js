const { Composer } = require('telegraf');
const { altModeComposerActions: Actions } = require('../../MainMenu/actions');
const sendMessageAltMode = require('../keyboards/sendMessageAltMode.keyboard');
const sendMessageDriverMenu = require('../../MainMenu/keyboards/sendMessageDriverMenu.keyboard');
const { sendError } = require('../../../utils/sendLoadings');
const sendMessageALtModeTasksKeyboard = require('../keyboards/sendMessageALtModeTasks.keyboard');
const altModeComposer = require('../../AltMode/index.js');

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

    composer.action(`${list.list_id}`, async (ctx) => {

      await ctx.deleteMessage()
      ctx.session.states.current.list_id = list.list_id
      ctx.session.currentRouteNumber = i

      await sendMessageALtModeTasksKeyboard(ctx)
      composer.use(...altModeComposer(ctx))
    })


  })



  return composer
}

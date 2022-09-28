const { Composer } = require('telegraf');
const { sendFormatMsgFromAllClickUpLists } = require('../../../features/getRoute.feature');
const { sendError } = require('../../../utils/sendLoadings');
const { routesInfoComposerActions: Actions } = require('../actions');
/**
  * Обработчик меню с информацией о маршрутах
  */
const routesInfoComposer = new Composer();

routesInfoComposer.action(Actions.ROUTESINFO, async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendFormatMsgFromAllClickUpLists(ctx)
  } catch (e) {
    console.log(e)
    await sendError(ctx, e)
  }
})

module.exports = routesInfoComposer
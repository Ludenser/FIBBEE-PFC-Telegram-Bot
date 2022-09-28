const { Composer } = require('telegraf');
const sendMessageInfo = require('../keyboards/sendMessageInfo.keyboard');
const sendMessageDocs = require('../keyboards/sendMessageDocs.keyboard');
const sendMessageDriverMenu = require('../keyboards/sendMessageDriverMenu.keyboard');
const sendMessageStart = require('../keyboards/sendMessageStart.keyboard');
const { sendError, sendProses } = require('../../../utils/sendLoadings');
const { mainMenuComposerActions: Actions } = require('../actions');

/**
  * Обработчик главного меню
  */
const mainMenuComposer = new Composer();

mainMenuComposer.action(Actions.INFO, async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendMessageInfo(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }

})

mainMenuComposer.action(Actions.DOCS, async (ctx) => {
  try {
    await ctx.deleteMessage()
    if (ctx.session.isAuthUser === false) {
      await sendProses(ctx, ctx.i18n.t('authError_message'))
      await sendMessageStart(ctx)
    } else {
      await sendMessageDocs(ctx)
    }
  } catch (e) {
    await sendError(ctx, e)
  }

})

mainMenuComposer.action(Actions.DRIVERMENU, async (ctx) => {
  try {
    await ctx.deleteMessage()
    if (ctx.session.isAuthUser === false) {
      await sendProses(ctx, ctx.i18n.t('authError_message'))
      await sendMessageStart(ctx)
    } else {
      await sendMessageDriverMenu(ctx)
    }
  } catch (e) {
    await sendError(ctx, e)
  }

})


module.exports = mainMenuComposer
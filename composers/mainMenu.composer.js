const { Composer } = require('telegraf');
const sendMessageInfo = require('../keyboards/mainMenu/sendMessageInfo');
const sendMessageDocs = require('../keyboards/mainMenu/sendMessageDocs');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const { sendError, sendProses } = require('../utils/sendLoadings');
const sendMessageStart = require('../keyboards/mainMenu/sendMessageStart');

const INFO = 'info'
const DOCS = 'docs'
const DRIVERMENU = 'driverMenu'


/**
  * Обработчик главного меню
  */
const composer = new Composer();

composer.action(INFO, async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendMessageInfo(ctx)
  } catch (e) {
    await sendError(ctx, e)
  }

})

composer.action(DOCS, async (ctx) => {
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

composer.action(DRIVERMENU, async (ctx) => {
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


module.exports = composer
import { Composer } from 'telegraf';
import sendMessageInfo from '../keyboards/sendMessageInfo.keyboard';
import sendMessageDocs from '../keyboards/sendMessageDocs.keyboard';
import sendMessageDriverMenu from '../keyboards/sendMessageDriverMenu.keyboard';
import sendMessageStart from '../keyboards/sendMessageStart.keyboard';
import { sendError, sendProses } from '../../../utils/sendLoadings';
import { mainMenuComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';

/**
  * Обработчик главного меню
  */
export const mainMenuComposer = new Composer<SessionCtx>();

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

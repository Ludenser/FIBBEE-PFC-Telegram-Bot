import { Composer } from 'telegraf';
import sendMessageInfo from '../keyboards/sendMessageInfo.keyboard';
import sendMessageDocs from '../keyboards/sendMessageDocs.keyboard';
import sendMessageStart from '../keyboards/sendMessageStart.keyboard';
import { sendError, sendProses } from '../../../utils/sendLoadings';
import { mainMenuComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';
import sendMessageAltModeKeyboard from '../keyboards/sendMessageAltMode.keyboard';
import sendMessageALtModeTasksKeyboard from '../../AltMode/keyboards/sendMessageALtModeTasks.keyboard';
import altModeComposer from '../../AltMode/index'

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

mainMenuComposer.action(Actions.MODE_CHANGE, async (ctx) => {
  try {
    await ctx.deleteMessage()
    if (ctx.session.isAuthUser === false) {
      await sendProses(ctx, ctx.i18n.t('authError_message'))
      await sendMessageStart(ctx)
    } else {
      await sendMessageAltModeKeyboard(ctx)
      ctx.session.all_lists.forEach((list, i) => {

        mainMenuComposer.action(`${list.list_id}`, async (ctx) => {

          await ctx.deleteMessage()
          ctx.session.states.current.list_id = list.list_id
          ctx.session.currentRouteNumber = i

          await sendMessageALtModeTasksKeyboard(ctx)
          mainMenuComposer.use(...altModeComposer(ctx))
        })
      })
    }
  } catch (e) {
    await sendError(ctx, e)
  }
})

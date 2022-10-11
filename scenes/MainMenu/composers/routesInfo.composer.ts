import { Composer } from 'telegraf';
import { sendFormatMsgFromAllClickUpLists } from '../../../features/getRoute.feature';
import { SessionCtx } from '../../../global';
import { sendError } from '../../../utils/sendLoadings';
import { routesInfoComposerActions as Actions } from '../actions';
/**
  * Обработчик меню с информацией о маршрутах
  */
export const routesInfoComposer = new Composer<SessionCtx>();

routesInfoComposer.action(Actions.ROUTESINFO, async (ctx) => {
  try {
    await ctx.deleteMessage()
    await sendFormatMsgFromAllClickUpLists(ctx)
  } catch (e) {
    console.log(e)
    await sendError(ctx, e)
  }
})

import { SessionCtx } from '../../../global';
import { Composer } from 'telegraf';
import { altModeComposerActions as Actions } from '../../MainMenu/actions';
import sendMessageAltMode from '../../MainMenu/keyboards/sendMessageAltMode.keyboard';
import sendMessageDriverMenu from '../../MainMenu/keyboards/sendMessageDriverMenu.keyboard';
import { sendError } from '../../../utils/sendLoadings';
import sendMessageALtModeTasksKeyboard from '../keyboards/sendMessageALtModeTasks.keyboard';
import altModeComposer from '../../AltMode/index';

/**
    * Обработка выбора маршрута
    * @param {SessionCtx} ctx - объект контекста telegraf
    */
export default (ctx: SessionCtx) => {
  const composer = new Composer<SessionCtx>()

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

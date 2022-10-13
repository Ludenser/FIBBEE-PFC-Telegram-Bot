import { Composer } from 'telegraf';
import { sendError } from '../../../utils/sendLoadings';
import _ from 'lodash';
import { sendFormatMsgFromCurrentClickUpList } from '../../../features/getRoute.feature';
import sendMessageInitRouteMenu from '../keyboards/sendMessageInit.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { menu_states } from '../../../config/otherSettings';
import { selectRouteComposerActions as Actions } from '../actions';
import { SessionCtx } from '../../../global';

/**
  * Обработчик сцены выбора роута. 
  * 
  * Динамическое создание Wizard`а со сценами из таск.листа ClickUp.
  * 
  * Главная регистрация всех сцен бота.
  */
export default (ctx: SessionCtx) => {

    const selectComposerArray = _(ctx.session.all_lists)
        .map((el, i) => {

            const selectComposer = new Composer<SessionCtx>()
            selectComposer.action(`${Actions.SELECT_ROUTE}${i}`, async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    ctx.session.currentRouteNumber = i
                    ctx.session.states.current.menu_state = menu_states.DIVISION_SCENE
                    if (!ctx.session.states.route_msg.isDeleted) {
                        ctx.session.states.route_msg.id = await deleteMessagesById(ctx, ctx.session.states.route_msg.id, ctx.session.states.route_msg.isDeleted)
                    }
                    await sendFormatMsgFromCurrentClickUpList(ctx, ctx.session.all_lists[i].allTasksWithoutSide)
                    await sendMessageInitRouteMenu(ctx)
                    await ctx.scene.enter('INITIAL_WIZARD_ID')
                } catch (e) {
                    await sendError(ctx, e)
                }

            })
            return selectComposer
        })
        .value()
    return selectComposerArray
}

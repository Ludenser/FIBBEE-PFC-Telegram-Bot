import { Markup } from 'telegraf'
import isSide from '../../../features/isSide.feature'
import { SessionCtx, Task } from '../../../global'
import {
    exitComposerActions as exit_Actions,
    customFieldsComposerActions as cf_Actions,
    commentComposerActions as comment_Actions,
    photoProcessComposerActions as photo_Actions,
} from '../actions'


/**
    * Клавиатура сцены обслуживания комплекса
    * @param {SessionCtx} ctx - объект контекста telegraf
    * @param {Task} task - текст сообщения над клавиатурой, по умолчанию 'Меню'
    * @param {string} msg - ClickUp id текущего таска
    */

export default async (ctx: SessionCtx, task: Task, msg: string) => {
    let buttons = []
    if (task.id === ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id) {
        buttons = [
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'),
                `${photo_Actions.UPL_PHOTO}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEdit'),
                `${cf_Actions.CUSTOM_FIELD_EDIT_ACT}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('exit_keyBoard_exitButton'),
                `${exit_Actions.EXIT}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_leave'),
                `${exit_Actions.LEAVE}${task.id}`
            ),
        ]
    } else {
        buttons = [
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'),
                `${photo_Actions.UPL_PHOTO}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_comment'),
                `${comment_Actions.UPL_COMMENT}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEdit'),
                `${cf_Actions.CUSTOM_FIELD_EDIT_ACT}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_finish'),
                `${exit_Actions.EXIT}${task.id}`
            ),
            Markup.button.callback(
                ctx.i18n.t('mainComplex_scene_keyBoard_leave'),
                `${exit_Actions.LEAVE}${task.id}`
            ),
        ]
    }
    await ctx.replyWithHTML(msg,
        Markup.inlineKeyboard(
            isSide(ctx, task, msg, buttons),
            {
                wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2.5
            })
    )

}
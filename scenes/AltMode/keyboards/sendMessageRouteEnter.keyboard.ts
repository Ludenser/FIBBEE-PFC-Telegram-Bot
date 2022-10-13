import { Markup } from 'telegraf'
import isSide from '../../../features/isSide.feature'
import { SessionCtx, Task } from '../../../global'

/**
    * Клавиатура сцены обслуживания комплекса
    * @param {SessionCtx} ctx - объект контекста telegraf
    * @param {Task} task - текст сообщения над клавиатурой, по умолчанию 'Меню'
    * @param {string} msg - ClickUp id текущего таска
    */

export default async (ctx: SessionCtx, task: Task, msg: string) => {
    let buttons = [
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'), `upl_photo${task.id}`),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_comment'), `upl_comment${task.id}`),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEdit'), `custom_field_edit_act${task.id}`),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_finish'), `exit${task.id}`),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_leave'), `leave${task.id}`),
    ]



    await ctx.replyWithHTML(msg,
        Markup.inlineKeyboard(
            isSide(ctx, task, msg, buttons)
            , {
                wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2.5
            })
    )

}
import { Markup } from 'telegraf'
import isSide from '../../../features/isSide.feature'
import { SessionCtx, Task } from '../../../global'
import isTaskLast from '../../../utils/isTaskLast'

/**
    * Клавиатура сцены обслуживания комплекса
    * @param {SessionCtx} ctx - объект контекста telegraf
    * @param {Task} task
    * @param {string} msg - текст сообщения над клавиатурой, по умолчанию 'Меню'
    */

export default async (ctx: SessionCtx, task: Task, msg: string) => {
    isTaskLast(ctx.session)
    let buttons = [
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'), 'upl_photo'),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_comment'), 'upl_comment'),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEdit'), 'custom_field_edit_act'),
        Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_finish'), ctx.session.states.isTaskLast ? 'exit' : 'next_step'),
    ]

    await ctx.replyWithHTML(msg,
        Markup.inlineKeyboard(
            isSide(ctx, task, msg, buttons), 
            {
                wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
            })
    )

}
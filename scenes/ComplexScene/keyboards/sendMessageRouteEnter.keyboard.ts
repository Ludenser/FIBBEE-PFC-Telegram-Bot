import { Markup } from 'telegraf'
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

    if (task) {
        const currentTaskLabel = task.custom_fields.find(o => o.type === 'labels')
        if (currentTaskLabel && currentTaskLabel.hasOwnProperty('value')) {
            ctx.session.states.current.task.locationLabel = currentTaskLabel.value[0]
            if (ctx.session.all_lists[ctx.session.currentRouteNumber].hasOwnProperty('sideTasks')) {
                let labels_id: string[] = []
                for (let sideTask of ctx.session.all_lists[ctx.session.currentRouteNumber].sideTasks) {
                    for (let custom_field of sideTask.custom_fields) {
                        if (custom_field.type === 'labels') {
                            for (let labels_ids of custom_field.value) {
                                const currentLabel = custom_field.type_config.options.find(o => o.id === labels_ids)
                                labels_id.push(currentLabel.id)
                            }
                        }
                    }
                }
                if (currentTaskLabel.hasOwnProperty('value') && Array.isArray(currentTaskLabel.value)) {
                    if (labels_id.includes(currentTaskLabel.value.join())) {
                        ctx.session.states.current.side_task.ids = labels_id.filter((item, index) => {
                            return labels_id.indexOf(item) === index
                        })
                        msg += '\n' + ctx.i18n.t('mainComplex_scene_keyBoard_header_ifSideTaskMenu')
                        buttons.push(Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_sideTaskMenu'), 'sideTask_menu'))
                    }
                }
            }
        }
    }

    await ctx.replyWithHTML(msg,
        Markup.inlineKeyboard(
            buttons
            , {
                wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
            })
    )

}
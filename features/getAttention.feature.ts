import { SessionCtx } from '../global';
import _ from 'lodash';
import { Clickup } from '../api';
import { sendProses } from '../utils/sendLoadings';

/**
   * Функция для выдачи сообщения с информацией об актуальных особенностях комплекса.
   */
export default async (ctx: SessionCtx, task_id: string) => {
    try {
        ctx.session.states.attention_msg.id = []

        const ClickAPI = new Clickup(ctx.session.user.CU_Token)
        const allCustomFields = await ClickAPI.Tasks.getTaskByTaskId(task_id)
        const custom_field = _(allCustomFields.custom_fields)
            .filter(item => _.includes(item.name, 'Обратить внимание'))
            .value()
        for (let element of custom_field) {
            element.value
                && await ctx.replyWithHTML(`<b>${element.name}</b> \n${element.value}`)
                    .then((result) => {
                        ctx.session.states.attention_msg.id = [...ctx.session.states.attention_msg.id, result.message_id]
                    })
            // : await ctx.replyWithHTML(ctx.i18n.t('mainComplex_scene_keyBoard_customFields_notExist', { name: element.name }))
            //     .then((result) => {
            //         ctx.session.states.attention_msg.id = [...ctx.session.states.attention_msg.id, result.message_id]
            //     })
        }
        ctx.session.states.attention_msg.isDeleted = false
    } catch (e) {
        await sendProses(ctx, e)
    }
}
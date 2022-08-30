const { Markup } = require('telegraf')
const isTaskLast = require('../../../utils/isTaskLast')

/**
    * Клавиатура сцены обслуживания комплекса
    * @param {Сtx} ctx - объект контекста telegraf
    * @param {String} msg - текст сообщения над клавиатурой, по умолчанию 'Меню'
    * @param {String} task_id - ClickUp id текущего таска
    */

module.exports = async (ctx, msg, task_id) => {

    await ctx.reply(msg,
        Markup.inlineKeyboard(
            [
                Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhoto'), 'upl_photo'),
                Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_comment'), 'upl_comment'),
                Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_finish'), isTaskLast(ctx.session.all_lists, task_id) ? 'exit' : 'next_step'),
                // Markup.button.callback('Выйти', 'leaveScene')
            ], {
            wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
    )

}
const { Markup } = require('telegraf')

module.exports = async (ctx, msg = 'Меню') => {

    await ctx.reply(msg,
        Markup.inlineKeyboard(
            [
                Markup.button.callback('Загрузить фото', 'upl_photo'),
                Markup.button.callback('Оставить комментарий', 'upl_comment'),
                Markup.button.callback('Закончить обслуживание', 'next_step'),
                Markup.button.callback('Выйти', 'leaveScene')
            ], {
            wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
    )
}
const { Markup } = require('telegraf')

module.exports = async (ctx) => {
    const msg = 'Чтобы завершть роут и выйти в главное меню нажми кнопку ниже'
    await ctx.reply(msg,
        Markup.inlineKeyboard(
            [
                Markup.button.callback('Закрыть роут', 'closeRoute'),
            ], {
            wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
    )
}
const { Markup } = require('telegraf')

module.exports = async (ctx) => {

    await ctx.reply(ctx.i18n.t('exit_keyBoard_header'),
        Markup.inlineKeyboard(
            [
                Markup.button.callback(ctx.i18n.t('exit_keyBoard_exitButton'), 'closeRoute'),
            ], {
            wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
    )
}
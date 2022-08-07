const { Markup } = require("telegraf")

module.exports = async (ctx) => {

    await ctx.reply(ctx.i18n.t('messageSceneCarPhoto'),
        Markup.keyboard([
            'Подтвердить загрузку фото✅'
        ]
        ).oneTime(true).resize(true)
    )
}
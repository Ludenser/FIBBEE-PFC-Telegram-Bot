const { Markup } = require("telegraf")

module.exports = async (ctx) => {

    await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'),
        Markup.keyboard([
            'Подтвердить загрузку фото✅'
        ]
        ).oneTime(true).resize(true)
    )
}
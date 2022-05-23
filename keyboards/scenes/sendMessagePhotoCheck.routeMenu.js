const { Markup } = require("telegraf")

module.exports = async (area, ctx) => {
    switch (area) {
        case 'main':
            await ctx.reply(ctx.i18n.t('messageSceneUazPhotoCheck'),
                Markup.inlineKeyboard([
                    Markup.button.callback('Закончить загрузку✅', 'get_start'),
                    Markup.button.callback('Выйти!❌', 'leaveScene')
                ]
                )
            )
            break

        case 'point':
            await ctx.reply(ctx.i18n.t('messageSceneUazPhotoCheck'),
                Markup.inlineKeyboard([
                    Markup.button.callback('Закончить загрузку✅', 'enter'),
                    Markup.button.callback('Выйти!❌', 'leaveScene')
                ]
                )
            )
            break
    }

}
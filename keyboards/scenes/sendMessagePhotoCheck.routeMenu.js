const { Markup } = require("telegraf")

/**
    * Клавиатура подтверждения загрузки фото
    * @area строка, 'main' для главного меню, либо 'point' для сцены комплекса
    */
module.exports = async (area = 'string', ctx) => {
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
                    Markup.button.callback('Вернуться в меню', 'reenter')
                ]
                )
            )
            break
    }

}
const { Markup } = require("telegraf")

/**
    * Клавиатура подтверждения загрузки фото
    * @param {Сtx} ctx - объект контекста telegraf
    * @param {String} scene - 'main' для сцены с контролем авто, 'complex' для сцены комплекса
    */
module.exports = async (ctx, scene) => {
    switch (scene) {
        case 'main':
            await ctx.reply(ctx.i18n.t('messageScenePhotoCheck'),
                Markup.inlineKeyboard([
                    Markup.button.callback('Закончить загрузку✅', 'get_start'),
                    Markup.button.callback('Выйти!❌', 'leaveScene')
                ]
                )
            )
            break

        case 'complex':
            await ctx.reply(ctx.i18n.t('messageScenePhotoCheck'),
                Markup.inlineKeyboard([
                    Markup.button.callback('Вернуться в меню', 'reenter')
                ]
                )
            )
            break
    }

}
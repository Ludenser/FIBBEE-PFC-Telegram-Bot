module.exports = async (ctx) => {

    await ctx.reply(ctx.i18n.t('messageSceneUazPhotoCheck'),
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Закончить загрузку✅', callback_data: 'point_1' }
                    ],
                    [
                        { text: 'Выйти!❌', callback_data: 'leaveScene' }
                    ]
                ]
            },
            parse_mode: "Markdown"

        })
}
module.exports = async (ctx) => {

    await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'),
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Назад!↩️', callback_data: 'leaveScene' }
                    ]
                ]
            },
            reply_markup: {
                keyboard: [
                    [{ text: 'Подтвердить загрузку фото✅' }]
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            },
            parse_mode: "Markdown"
        })
}
module.exports = async (ctx) => {

    await ctx.reply(ctx.i18n.t('messageSceneUazPhoto'),
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Назад!↩️', callback_data: 'leaveScene' }
                    ]
                ],
                one_time_keyboard: [
                    [
                        { text: 'Подтвердить загрузку.' }
                    ]
                ]
            },
            reply_markup: {
                keyboard: [
                    [{ text: 'Подтвердить загрузку' }]
                ],
                one_time_keyboard: true,
                resize_keyboard: true
            },
            parse_mode: "Markdown"


        })
}
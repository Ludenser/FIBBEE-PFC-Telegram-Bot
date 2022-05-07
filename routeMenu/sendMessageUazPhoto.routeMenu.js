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
            parse_mode: "Markdown"

        })
}
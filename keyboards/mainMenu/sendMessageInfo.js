module.exports = async (ctx) => {
  await ctx.replyWithPhoto('https://vse-vakansii.ru/web/uploads/company/410aaf4310b3f6fbee8df0d942109f17.png',
    {
      caption: ctx.i18n.t('info_keyBoard_header'),
      reply_markup: {
        inline_keyboard: [
          [
            { text: ctx.i18n.t('info_keyBoard_portalLinkText'), url: ctx.i18n.t('info_keyBoard_portalLinkURL') },
          ],
          [
            { text: ctx.i18n.t('return_button'), callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}
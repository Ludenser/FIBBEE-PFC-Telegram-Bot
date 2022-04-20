module.exports = async (ctx) => {
  await ctx.replyWithPhoto('https://vse-vakansii.ru/web/uploads/company/410aaf4310b3f6fbee8df0d942109f17.png',
    {
      caption: ctx.i18n.t('info'),
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'FIBBEE🆘', url: 'https://fibbee.com/' },
          ],
          [
            { text: 'Назад!↩️', callback_data: 'start' }
          ]
        ]
      },
      parse_mode: "Markdown"
    })
}
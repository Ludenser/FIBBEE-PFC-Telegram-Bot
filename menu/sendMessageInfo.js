module.exports = async (ctx) => {
  await ctx.reply(ctx.i18n.t('info'),
    {
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
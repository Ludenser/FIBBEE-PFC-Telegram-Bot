module.exports = async (ctx) => {

  await ctx.reply(ctx.i18n.t('helperInitRouteScene'),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Приступить к работе (Открыть роут).', callback_data: `openRoute${ctx.routeNumber}` }
          ],
          [
            { text: 'Назад!↩️', callback_data: 'leaveScene' }
          ]
        ]
      },
      parse_mode: "Markdown"

    })
}
const { Markup } = require('telegraf')

module.exports = async (ctx) => {


  await ctx.reply(ctx.i18n.t('helperInitRouteScene'),
    Markup.inlineKeyboard([
      Markup.button.callback('Приступить к работе (Открыть роут).', `openRoute${ctx.routeNumber}`),
      Markup.button.callback('Назад!↩️', 'leaveScene')
    ]
    )
  )
}
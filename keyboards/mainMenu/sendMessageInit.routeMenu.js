const { Markup } = require('telegraf')

module.exports = async (ctx) => {


  await ctx.reply(ctx.i18n.t('helperInitRoute_scene_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('helperInitRoute_scene_initMessage'), `openRoute${ctx.session.currentRouteNumber}`),
      Markup.button.callback(ctx.i18n.t('return_message'), 'leaveScene')
    ], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    }

    )
  )
}
const { Markup } = require("telegraf")

module.exports = async (ctx, current_complex, next_complex) => {
  await ctx.reply(ctx.i18n.t('nextStep_scene_keyBoard_header', { current_complex, next_complex }),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('nextStep_scene_keyBoard_initButton'), 'enter'),
    ]))
}
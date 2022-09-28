const { Markup } = require("telegraf")

module.exports = async (ctx) => {
  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditAction_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('return_button'), 'custom_field_edit_act')
    ]))
}
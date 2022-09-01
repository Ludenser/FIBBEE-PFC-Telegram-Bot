const { Markup } = require("telegraf")

module.exports = async (ctx) => {
  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_editButton'), 'editCF'),
      Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_eraseButton'), 'eraseCF'),
      Markup.button.callback(ctx.i18n.t('return_button'), 'reenter'),
    ], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    }))
}
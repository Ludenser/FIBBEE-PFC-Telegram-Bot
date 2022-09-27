const { Markup } = require("telegraf")

module.exports = async (ctx) => {

  await ctx.reply(ctx.i18n.t('init_scene_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('init_scene_keyBoard_initButton'), 'enter'),
    ])
  );
}
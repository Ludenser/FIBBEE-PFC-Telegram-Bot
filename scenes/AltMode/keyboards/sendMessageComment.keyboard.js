const { Markup } = require('telegraf')

module.exports = async (ctx) => {

  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_commentMenu_header'),

    Markup
      .inlineKeyboard([
        Markup.button.callback(ctx.i18n.t('return_button'), `reenter${ctx.session.states.current.task.id}`),
      ]))
}
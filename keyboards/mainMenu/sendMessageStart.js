const fs = require('fs');
const { Markup } = require('telegraf');
const setting = JSON.parse(fs.readFileSync(`./lib/setting.json`))
const { ownerbot } = setting

module.exports = async (ctx) => {
  let buttons = [
    Markup.button.callback(ctx.i18n.t('start_keyBoard_info'), 'info'),
  ]

  !ctx.session.isAuthUser
    ? buttons.push(Markup.button.url('Авторизоваться', 'https://telegrambottest.herokuapp.com/auth/'))
    : buttons.push(
      Markup.button.callback(ctx.i18n.t('start_keyBoard_docs'), 'docs'),
      Markup.button.callback(ctx.i18n.t('start_keyBoard_driverMenu'), 'driverMenu'),
    )


  await ctx.reply(ctx.i18n.t('start_keyBoard_header', { ctx, ownerbot }),
    Markup.inlineKeyboard(buttons, {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 2) / 2
    }),
  )
}
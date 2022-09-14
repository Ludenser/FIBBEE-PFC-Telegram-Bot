const fs = require('fs');
const { Markup } = require('telegraf');
const setting = JSON.parse(fs.readFileSync(`./lib/setting.json`))
const { ownerbot } = setting
require('dotenv').config();


module.exports = async (ctx) => {
  const APP_NAME = process.env.HEROKU_APP_NAME || 'telegrambotfibbee'
  let buttons = [
    Markup.button.callback(ctx.i18n.t('start_keyBoard_info'), 'info'),
  ]

  !ctx.session.isAuthUser
    ? buttons.push(Markup.button.url('Авторизоваться', `https://${APP_NAME}.herokuapp.com/auth/`))
    : buttons.push(
      Markup.button.callback(ctx.i18n.t('start_keyBoard_docs'), 'docs'),
      Markup.button.callback(ctx.i18n.t('start_keyBoard_driverMenu'), 'driverMenu'),
    )

  if (ctx.session.isAuthUser) {
    await ctx.reply(ctx.i18n.t('start_keyBoard_header', { ctx, ownerbot }),
      Markup.inlineKeyboard(buttons, {
        wrap: (btn, index, currentRow) => currentRow.length >= (index + 2) / 2
      }
      ),
    )
  } else {
    await ctx.reply(ctx.i18n.t('start_keyBoard_header', { ctx, ownerbot }),
      Markup.inlineKeyboard(buttons, {
        wrap: (btn, index, currentRow) => currentRow.length >= (index + 2) / 2
      }
      ),
    ).then((result) => {
      ctx.session.authMsg.id = [result.message_id]
    })
  }

}
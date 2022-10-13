import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'typegram/markup';
import { SessionCtx } from '../../../global';

require('dotenv').config();

const APP_NAME = process.env.HEROKU_APP_NAME || 'telegrambotfibbee'

export default async (ctx: SessionCtx) => {
  const extra = 'Foodtronics'
  let buttons: (InlineKeyboardButton.CallbackButton | InlineKeyboardButton.UrlButton)[] = [
    Markup.button.callback(ctx.i18n.t('start_keyBoard_info'), 'info'),
  ]

  !ctx.session.isAuthUser
    ? buttons.push(Markup.button.url('Авторизоваться', `https://${APP_NAME}.herokuapp.com/auth/`))
    : buttons.push(
      Markup.button.callback(ctx.i18n.t('start_keyBoard_docs'), 'docs'),
      Markup.button.callback(ctx.i18n.t('start_keyBoard_driverMenu'), 'driverMenu'),
    )

  await ctx.reply(ctx.i18n.t('start_keyBoard_header', { ctx, extra }),
    Markup.inlineKeyboard(buttons, {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 2) / 2
    }
    ),
  )
}
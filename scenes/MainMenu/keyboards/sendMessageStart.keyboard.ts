import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'typegram/markup';
import { SessionCtx } from '../../../global';
import { mainMenuComposerActions } from '../actions';

require('dotenv').config();

const AUTH_URL = process.env.AUTH_URL

export default async (ctx: SessionCtx) => {
  const extra = 'Foodtronics'
  let buttons: (InlineKeyboardButton.CallbackButton | InlineKeyboardButton.UrlButton)[] = [
    Markup.button.callback(ctx.i18n.t('start_keyBoard_info'), 'info'),
  ]

  !ctx.session.isAuthUser
    ? buttons.push(Markup.button.url(
      'Авторизоваться',
      `${AUTH_URL}/auth/`
    ))
    : buttons.push(
      Markup.button.callback(
        ctx.i18n.t('start_keyBoard_docs'),
        mainMenuComposerActions.DOCS
      ),
      Markup.button.callback(
        ctx.i18n.t('start_keyBoard_driverMenu'),
        mainMenuComposerActions.DRIVERMENU
      ),
    )

  await ctx.reply(
    ctx.i18n.t('start_keyBoard_header', { ctx, extra }),
    Markup.inlineKeyboard(buttons, {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 2) / 2
    }
    ),
  )
}
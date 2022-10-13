import { Markup } from "telegraf"
import { SessionCtx } from '../../../global'

export default async (ctx: SessionCtx) => {
  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_editButton'), 'edit_CF'),
      Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditMenu_eraseButton'), 'erase_CF'),
      Markup.button.callback(ctx.i18n.t('return_button'), 'reenter'),
    ], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    }))
}
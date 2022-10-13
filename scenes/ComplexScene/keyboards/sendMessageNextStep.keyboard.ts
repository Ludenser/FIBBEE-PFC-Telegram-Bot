import { Markup } from "telegraf"
import { SessionCtx } from '../../../global'

export default async (ctx: SessionCtx, current_complex: string, next_complex: string) => {
  await ctx.reply(ctx.i18n.t('nextStep_scene_keyBoard_header', { current_complex, next_complex }),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('nextStep_scene_keyBoard_initButton'), 'enter'),
    ]))
}
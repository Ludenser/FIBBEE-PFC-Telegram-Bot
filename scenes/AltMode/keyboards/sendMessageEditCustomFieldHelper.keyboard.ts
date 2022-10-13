import { Markup } from "telegraf"
import { SessionCtx } from '../../../global'

export default async (ctx: SessionCtx) => {
  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditAction_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('return_button'), `custom_field_edit_act${ctx.session.states.current.task.id}`)
    ]))
}
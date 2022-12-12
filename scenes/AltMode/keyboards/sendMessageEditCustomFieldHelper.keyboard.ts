import { Markup } from "telegraf"
import { SessionCtx } from '../../../global'
import { customFieldsComposerActions as cf_Actions } from '../actions'

/**
    * Клавиатура меню custom-field
    * @param {SessionCtx} ctx - объект контекста telegraf
    */
export default async (ctx: SessionCtx) => {
  await ctx.reply(
    ctx.i18n.t('mainComplex_scene_keyBoard_customFieldEditAction_header'),
    Markup.inlineKeyboard([
      Markup.button.callback(
        ctx.i18n.t('return_button'),
        `${cf_Actions.CUSTOM_FIELD_EDIT_ACT}${ctx.session.states.current.task.id}`
      )
    ]))
}
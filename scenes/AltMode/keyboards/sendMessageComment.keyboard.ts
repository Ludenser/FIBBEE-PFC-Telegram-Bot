import { Markup } from 'telegraf'
import { SessionCtx } from '../../../global'
import { enterComposerActions as shared_Actions } from "../actions";

/**
    * Клавиатура меню отправки комментария к таску
    * @param {SessionCtx} ctx - объект контекста telegraf
    */
export default async (ctx: SessionCtx) => {

  await ctx.reply(
    ctx.i18n.t('mainComplex_scene_keyBoard_commentMenu_header'),
    Markup.inlineKeyboard(
      [
        Markup.button.callback(
          ctx.i18n.t('return_button'),
          `${shared_Actions.REENTER}${ctx.session.states.current.task.id}`
        ),
      ]
    ))
}
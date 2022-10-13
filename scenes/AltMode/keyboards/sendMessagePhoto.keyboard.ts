import { Markup } from 'telegraf';
import { SessionCtx } from '../../../global';

/**
    * Клавиатура сцены обслуживания комплекса
    * @param {SessionCtx} ctx - объект контекста telegraf
    * @param {string} name - текст сообщения над клавиатурой
    */

export default async (ctx: SessionCtx, name: string) => {

  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_currentComplexName', { name }))
  await ctx.reply(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_header'),
    Markup.inlineKeyboard(
      [
        ctx.session.states.current.side_task.id
          ? Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_doneUplButton'), 'sideTask_upl_comment_done')
          : Markup.button.callback(ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_doneUplButton'), `reenter${ctx.session.states.current.task.id}`),
      ]
    )
  );

}
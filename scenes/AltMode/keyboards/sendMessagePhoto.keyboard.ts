import { Markup } from 'telegraf';
import { SessionCtx } from '../../../global';
import { sideTaskComposerActions as st_Actions, enterComposerActions as shared_Actions } from '../actions';


/**
    * Клавиатура сцены загрузки фото
    * @param {SessionCtx} ctx - объект контекста telegraf
    * @param {string} name - текст сообщения над клавиатурой
    */
export default async (ctx: SessionCtx, name: string) => {

  await ctx.reply(
    ctx.i18n.t(
      'mainComplex_scene_keyBoard_uploadPhotoMenu_currentComplexName',
      { name }
    )
  )
  await ctx.reply(
    ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_header'),
    Markup.inlineKeyboard(
      [
        ctx.session.states.current.side_task.id
          ? Markup.button.callback(
            ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_doneUplButton'),
            st_Actions.SIDETASK_UPL_PHOTO_DONE
          )
          : Markup.button.callback(
            ctx.i18n.t('mainComplex_scene_keyBoard_uploadPhotoMenu_doneUplButton'),
            `${shared_Actions.REENTER}${ctx.session.states.current.task.id}`
          ),
      ]
    )
  );

}
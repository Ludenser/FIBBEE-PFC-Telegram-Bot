const { Markup } = require('telegraf')

/**
    * Клавиатура сцены обслуживания комплекса
    * @param {Сtx} ctx - объект контекста telegraf
    * @param {String} name - текст сообщения над клавиатурой
    */

module.exports = async (ctx, name) => {

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
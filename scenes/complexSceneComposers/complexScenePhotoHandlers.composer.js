const { Composer } = require('telegraf');
const { postAttachments } = require('../../features/postAttachments.feature');
const { sendProses } = require('../../utils/sendLoadings');

const complexScenePhotoHandler = () => {
  const composer = new Composer()

  composer.on('photo', async (ctx) => {
    switch (ctx.session.states.currentMenuState) {
      case 'main':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'comment':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'photo':
        await postAttachments(ctx, ctx.session.states.currentTask_id);
        break;
      case 'custom_field':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'sideTask':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'sideTaskComment':
        await ctx.deleteMessage()
        await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
        break;
      case 'sideTask_photo':
        await postAttachments(ctx, ctx.session.states.currentSideTaskId)
        break;
    }

  })
  return composer
}

module.exports = complexScenePhotoHandler

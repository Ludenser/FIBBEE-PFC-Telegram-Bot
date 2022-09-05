const ClickUp = require('../api/index')
const userRegEx = require('../utils/regExp')


const { sendProses, sendError } = require('../utils/sendLoadings')
const sendMsgToDiscord = require('./sendWebHookToDiscord.feature')


/**
  * Функция для отправки комментария и обработки введенного сообщения на наличие назначений сотрудников
  */
module.exports = async (ctx, task_id) => {
  const ClickAPI = new ClickUp(ctx.session.user.CU_Token)
  try {

    const usernameQuery = userRegEx('(?<=@).+', ctx.update.message.text)
    if (usernameQuery == ctx.update.message.text) {
      await ClickAPI.Tasks.createComment(ctx.update.message.text, task_id)
      await sendProses(ctx, ctx.i18.t('mainComplex_scene_commentActions_clickUpPlainTextComment'))
    } else if (usernameQuery.includes('monitoring') || usernameQuery.includes('service') || usernameQuery.includes('daily')) {
      await sendMsgToDiscord(ctx.update.message.text, ctx.session.states.currentLocationName)
      await sendProses(ctx, ctx.i18.t('mainComplex_scene_commentActions_discordMention'))
    } else {
      const response = await ClickAPI.Users.getUsers_id(ctx.session.all_lists[0].list_id)

      function hasUserFrom(env) {
        return user => user.username === env;
      }

      const username = response.data.members.find(hasUserFrom(usernameQuery))
      await ClickAPI.Tasks.createCommentWithAssignee(ctx.update.message.text, task_id, username.id)

      await sendProses(ctx, ctx.i18.t('mainComplex_scene_commentActions_clickUpMention', { username: username.username }))
    }

  } catch (e) {
    await sendError(ctx, e)
  }

}
const ClickUp = require('../api/index')
const { discord_role_ids } = require('../lib/otherSettings')
const { findMatch, replaceMatch } = require('../utils/regExp')
const { sendProses, sendError } = require('../utils/sendLoadings')
const sendMsgToDiscord = require('./sendWebHookToDiscord.feature')


/**
  * Функция для отправки комментария и обработки введенного сообщения на наличие назначений сотрудников
  * @param {Ctx} ctx - Объект контекста telegraf
  * @param {String} task_id - id задачи ClickUp 
  */
module.exports = async (ctx, task_id) => {
  const ClickAPI = new ClickUp(ctx.session.user.CU_Token)

  try {

    const usernameQuery = findMatch('(?<=@).+', ctx.update.message.text)
    if (usernameQuery == ctx.update.message.text) {
      await ClickAPI.Tasks.createComment(ctx.update.message.text, task_id)
      await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_clickUpPlainTextComment'))

    } else if (usernameQuery.includes('monitoring') || usernameQuery.includes('service') || usernameQuery.includes('daily') || usernameQuery.includes('supply')) {
      let reg = /(?<=)@().+/gm
      const mentionString = ctx.update.message.text.match(reg)
      let stringWithMention = ''
      switch (true) {
        case (mentionString[0] === '@monitoring' || mentionString[0] === '@monitoring team'):
          stringWithMention = replaceMatch(ctx.update.message.text, `<@&${discord_role_ids.monitoring}>`)
          break;

        case (mentionString[0] === '@service' || mentionString[0] === '@service team'):
          stringWithMention = replaceMatch(ctx.update.message.text, `<@&${discord_role_ids.service}>`)
          break;

        case (mentionString[0] === '@daily' || mentionString[0] === '@daily team'):
          stringWithMention = replaceMatch(ctx.update.message.text, `<@&${discord_role_ids.daily}>`)
          break;

        case (mentionString[0] === '@supply' || mentionString[0] === '@supply team'):
          stringWithMention = replaceMatch(ctx.update.message.text, `<@&${discord_role_ids.supply}>`)
          break;

        default:
          await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_incorrectTag'))
          break;
      }
      if (stringWithMention) {

        await sendMsgToDiscord(ctx.session.user.username, stringWithMention, ctx.session.states.currentTask_discordWebHook)
        await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_discordMention'))
      }

    } else {
      const response = await ClickAPI.Users.getUsers_id(ctx.session.all_lists[0].list_id)

      function hasUserFrom(env) {
        return user => user.username === env;
      }

      const username = response.data.members.find(hasUserFrom(usernameQuery))
      if (username) {

        await ClickAPI.Tasks.createCommentWithAssignee(ctx.update.message.text, task_id, username.id)
        await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_clickUpMention', { username: username.username }))

      } else {
        await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_incorrectTag'))
      }

    }

  } catch (e) {
    await sendError(ctx, e)
  }

}
import { Clickup } from '../api/index'
import { discord_role_ids } from '../config/otherSettings'
import { SessionCtx } from '../global'
import { ClickUser } from '../global';
import { findMatch, replaceMatch } from '../utils/regExp'
import { sendProses, sendError } from '../utils/sendLoadings'
import sendMsgToDiscord from './sendWebHookToDiscord.feature'

/**
  * Функция для отправки комментария и обработки введенного сообщения на наличие назначений сотрудников
  * @param {SessionCtx} ctx - Объект контекста telegraf
  * @param {string} task_id - id задачи ClickUp 
  */
export const postCommentFromMsg = async (ctx: SessionCtx, task_id: string) => {

  try {
    let text: string = '';
    if ('message' in ctx.update && 'text' in ctx.update.message) {
      text = ctx.update.message.text
    }
    const ClickAPI = new Clickup(ctx.session.user.CU_Token)
    const usernameQuery = findMatch(/(?<=@).+/, text)
    if (usernameQuery == text) {
      await ClickAPI.Tasks.createComment(text, task_id)
      await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_clickUpPlainTextComment'))

    } else if (usernameQuery.includes('monitoring') || usernameQuery.includes('service') || usernameQuery.includes('daily') || usernameQuery.includes('supply')) {
      let reg = /(?<=)@().+/gm
      const mentionString = text.match(reg)
      let stringWithMention = ''
      switch (true) {
        case (mentionString[0] === '@monitoring' || mentionString[0] === '@monitoring team'):
          stringWithMention = replaceMatch(text, `<@&${discord_role_ids.MONITORING}>`)
          break;

        case (mentionString[0] === '@service' || mentionString[0] === '@service team'):
          stringWithMention = replaceMatch(text, `<@&${discord_role_ids.SERVICE}>`)
          break;

        case (mentionString[0] === '@daily' || mentionString[0] === '@daily team'):
          stringWithMention = replaceMatch(text, `<@&${discord_role_ids.DAILY}>`)
          break;

        case (mentionString[0] === '@supply' || mentionString[0] === '@supply team'):
          stringWithMention = replaceMatch(text, `<@&${discord_role_ids.SUPPLY}>`)
          break;

        default:
          await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_incorrectTag'))
          break;
      }
      if (stringWithMention) {

        await sendMsgToDiscord(ctx.session.user.username, stringWithMention, ctx.session.states.current.task.discordWebHook)
        await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_discordMention'))
      }

    } else {
      const response = await ClickAPI.Users.getUsers_id(ctx.session.all_lists[0].list_id)

      const hasUserFrom = (env: string) => {
        return (user: ClickUser) => user.username === env;
      }

      const username = response.data.members.find(hasUserFrom(usernameQuery))
      if (username) {

        await ClickAPI.Tasks.createCommentWithAssignee(text, task_id, username.id)
        await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_clickUpMention', { username: username.username }))

      } else {
        await sendProses(ctx, ctx.i18n.t('mainComplex_scene_commentActions_incorrectTag'))
      }

    }

  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }

}

export const postCommentFromPhoto = async (ctx: SessionCtx, task_id: string, location_name: string) => {
  try {
    const ClickAPI = new Clickup(ctx.session.user.CU_Token)
    await ClickAPI.Tasks.createComment(`⬆ Фото из ${location_name} ⬆`, task_id)
  } catch (e) {
    await sendError(ctx, e)
    console.log(e);
  }
}

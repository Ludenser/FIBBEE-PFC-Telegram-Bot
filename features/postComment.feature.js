const { Task, Users } = require('../api/clickUpApi.service')
const userRegEx = require('../utils/regExp')
const sendMessageRouteEnter = require('../keyboards/scenes/sendMessageRouteEnter')
const deleteMessagePrev = require('../utils/deleteMessagePrev')

const { sendProses, sendError } = require('../utils/sendLoadings')


/**
  * Функция для отправки комментария и обработки введенного сообщения на наличие назначений сотрудников
  */
module.exports = async (ctx, task_id) => {
  try {

    const usernameQuery = userRegEx('(?<=@).+', ctx.update.message.text)
    if (usernameQuery == ctx.update.message.text) {
      await Task.createComment(ctx.update.message.text, task_id)
      await deleteMessagePrev(ctx, 1)
      await sendProses(ctx, 'Комментарий отправлен. Но ты никого не тегнул((')
      await sendMessageRouteEnter(ctx)
    } else {

      const response = await Users.getUsers_id(ctx.session.all_lists[0].list_id)


      function hasUserFrom(env) {
        return user => user.username === env;
      }

      const username = response.data.members.find(hasUserFrom(usernameQuery))
      await Task.createCommentWithAssignee(ctx.update.message.text, task_id, username.id)
      await deleteMessagePrev(ctx, 1)
      await sendProses(ctx, 'Комментарий отправлен. Все ОК.')
      await sendMessageRouteEnter(ctx)
    }

  } catch (e) {
    await sendError(ctx, e)
  }

}
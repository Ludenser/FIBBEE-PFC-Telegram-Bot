
const _ = require('lodash')
const { Markup } = require('telegraf');
const toLocalTime = require('../utils/toLocalTime');
const Clickup = require('../api');

function formattedTaskString(value, index) {
  const timeStamp = toLocalTime(value)
  return `\n\n${index + 1}. ${value.name} c ${timeStamp.timeStart} до ${timeStamp.timeDue}`
}

function formattedTitleString(value, index) {
  return `\n\n🔸<b>${index + 1} маршрут:</b>${value}`
}

module.exports = {

  /**
    * Отправка сообщения из списка тасков из всех тасклистов ClickUp в виде строк.
    */

  sendFormatMsgFromAllClickUpLists: async (ctx) => {

    const resArray = _(ctx.session.all_lists)
      .map((list) => {
        const nameValues = _(list.allTasksWithoutSide)
          .map((value, index) => { return formattedTaskString(value, index) })
        return nameValues
      })

    const msg = _(resArray)
      .map((value, index) => { return formattedTitleString(value, index) })

    ctx.replyWithHTML(msg.toString(),
      Markup.inlineKeyboard([
        Markup.button.callback(ctx.i18n.t('return_button'), 'driverMenu')
      ]))
  },

  /**
      * Отправка сообщения из списка тасков, указанного в аргументе тасклиста ClickUp, в виде строк.
      */
  sendFormatMsgFromCurrentClickUpList: async (ctx, list) => {

    const nameValues = _(list)

      .map((value, index) => { return formattedTaskString(value, index) })

    const reply = nameValues.join("\n")

    const msg = `🔸  <b>Маршрут:</b>\n${reply}`

    await ctx.replyWithHTML(msg)
  },

  /**
    * Получение списка id тасков из ClickUp
    */

  getTaskIdArrFromApi: async (token, list_id) => {
    try {
      const response = await new Clickup(token).Tasks.getTodayTasksWithStatusTodo(list_id)
      const newArr = response.data.tasks.reverse().map(value => {
        return value.id
      })
      return newArr
    } catch (e) {
      console.log(e)
    }
  }
}
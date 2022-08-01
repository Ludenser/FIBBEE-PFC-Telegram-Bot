const routes = require('../lib/routesNew.json');
const json = JSON.stringify(routes);
const objByJson = JSON.parse(json);
const { Task } = require('../api/clickUpApi.service');
const sendMessageError = require('../utils/sendMessageError');
const { Markup } = require('telegraf');
const toLocalTime = require('../utils/toLocalTime');

module.exports = {

  /**
    * Отправка сообщения из списка тасков в листе ClickUp в виде строк.
    * 
    * @param {Number[]} list_ids массив цифр из list_id из файла settings
    */

  getMessageAnyRoute: async (ctx) => {

    const resArray = ctx.session.all_lists.map((list, i) => {

      const nameValues = list.allTasks.reverse().map((value, index) => {

        const timeStamp = toLocalTime(value)
        return `\n\n\n${index + 1}. ${value.name} c ${timeStamp.timeStart} до ${timeStamp.timeDue}`
      })
      return nameValues

    })

    const msg = resArray.map((value, i) => {

      return `\n\n🔸<b>${i + 1} маршрут:</b>${value}`
    })

    ctx.replyWithHTML(msg.toString(),
      Markup.inlineKeyboard([
        Markup.button.callback('Назад!↩️', 'driverMenu')
      ]))
  },

  /**
      * Отправка сообщения из списка тасков в листе ClickUp в виде строк.
      * 
      * @param list_id пока что имеет два поля one и two, по мере потребности будет добавляться.
      */
  getMessageRouteFromClickAPI: async (ctx, [one, two] = []) => {
    try {

      const responseOne = await Task.getTodayTasksWithStatusTodo(one)

      const options = { weekday: 'short', month: 'numeric', day: 'numeric' }

      const nameValuesOne = responseOne.data.tasks.reverse().map((value, index) => {
        const timeStamp = toLocalTime(value)
        return `\n\n\n${index + 1}. ${value.name} c ${timeStamp.timeStart} до ${timeStamp.timeDue}`
      })

      if (two) {

        const responseTwo = await Task.getTodayTasksWithStatusTodo(two)
        const nameValuesTwo = responseTwo.data.tasks.reverse().map((value, index) => {
          const timeStamp = toLocalTime(value)
          return `\n\n\n${index + 1}. ${value.name} c ${timeStamp.timeStart} до ${timeStamp.timeDue}`
        })

        const replyOne = nameValuesOne.join("\n\n")
        const replyTwo = nameValuesTwo.join("\n\n")

        const msg = `🔸  <b>1️⃣ маршрут:</b>\n\n\n${replyOne},\n\n\n🔸  <b>2️⃣ маршрут</b> \n\n\n${replyTwo}`

        await ctx.replyWithHTML(msg,
          Markup.inlineKeyboard([
            Markup.button.callback('Назад!↩️', 'driverMenu')
          ]))

      } else {

        const reply = nameValuesOne.join("\n\n")
        await ctx.reply(reply)
      }

    } catch (e) {
      sendMessageError(ctx, e)
    }
  },

  /**
    * Получение списка id тасков из ClickUp
    */
  getTaskIdArrFromApi: async (list_id) => {
    try {
      const response = await Task.getTodayTasksWithStatusTodo(list_id)
      const newArr = response.data.tasks.reverse().map(value => {
        return value.id
      })
      return newArr
    } catch (e) {
      console.log(e)
    }
  }
}
const routes = require('../lib/routesNew.json');
const json = JSON.stringify(routes);
const objByJson = JSON.parse(json);
const { Task } = require('../api/clickUpApi.service');
const sendMessageError = require('../utils/sendMessageError');
const { Markup } = require('telegraf');

module.exports = {

  /**
    * Получение объекта комплексов
    * outdated  
    */
  getObjRoutes: function getObjRoutes(numRoute) {
    const targetArr = [];
    if (numRoute == 1) {
      const filtered = objByJson.filter(obj => obj.route == 1);
      for (i in filtered) {

        newObj = Object.assign({ name: filtered[i].name }, { value: filtered[i].time });
        targetArr.push(newObj);
      }
    } else if (!numRoute) {
      return objByJson
    } else {
      const filtered = objByJson.filter(obj => obj.route == 2);
      for (i in filtered) {

        newObj = Object.assign({ name: filtered[i].name }, { value: filtered[i].time });
        targetArr.push(newObj);
      }

    }

    return targetArr
  },

  /**
    * Получение списка комплексов в виде строки для сообщения
    * outdated
    */
  getMessageRoutes: function getMessageRoutes(ctx, numRoute) {

    let targetArr = [];
    if (numRoute == 1) {
      const filtered = objByJson.filter(obj => obj.route == 1);
      for (i in filtered) {
        targetArr.push(filtered[i].name);
      }
    } else if (!numRoute) {
      const
        filteredArr1 = [],
        filteredArr2 = []
      const filtered1 = objByJson.filter(obj => obj.route == 1);
      for (i in filtered1) {
        filteredArr1.push(filtered1[i].name);
      }
      const filtered2 = objByJson.filter(obj => obj.route == 2);
      for (i in filtered2) {
        filteredArr2.push(filtered2[i].name);
      }
      for (i in objByJson) {
        targetArr.push(objByJson[i].name);
      } return `
      ${ctx.i18n.t('decoreRoute1Number')}
      ${filteredArr1.join("\n\n")};
      ${ctx.i18n.t('decoreRoute2Number')}
      ${filteredArr2.join("\n\n")}`
    } else {
      const filtered = objByJson.filter(obj => obj.route == 2);
      for (i in filtered) {
        targetArr.push(filtered[i].name);
      }
    }
    return `${targetArr.join("\n")} `
  },

  /**
    * Отправка сообщения из списка тасков в листе ClickUp в виде строк.
    * 
    * @list_id имеет два поля one и two
    */

  getMessageAnyRoute: async function getMessageAnyRoute(ctx, [...list_ids] = []) {
    const response = await Task.getAll(...list_ids)
    const resArray = list_ids.map((point) => {

      const options = { weekday: 'short', month: 'numeric', day: 'numeric' }
      const nameValues = response.data.tasks.reverse().map((value, index) => {
        if (!value.start_date) {

          const timeStamp_Due = new Date(Number.parseInt(value.due_date))

          const time = timeStamp_Due.toLocaleTimeString([], { timeStyle: 'short' })
          const date = timeStamp_Due.toLocaleDateString([], options)

          return `\n\n\n${index + 1}. ${value.name}, по плану до ${time},${date}`

        } else {

          const timeStamp_Start = new Date(Number.parseInt(value.start_date))
          const timeStamp_Due = new Date(Number.parseInt(value.due_date))

          const timeStart = timeStamp_Start.toLocaleString([], { timeStyle: 'short' })
          const timeDue = timeStamp_Due.toLocaleString([], { timeStyle: 'short' })

          return `\n\n\n${index + 1}. ${value.name} c ${timeStart} до ${timeDue}`
        }

      })

      return nameValues
    })

    const msg = resArray.map((value, i) => {

      return `🔸 <b>${i + 1} маршрут:</b>\n${value},\n\n\n`
    })

    await ctx.replyWithHTML(...msg,
      Markup.inlineKeyboard([
        Markup.button.callback('Назад!↩️', 'driverMenu')
      ]))
  },

  getMessageRouteFromClickAPI: async function getMessageRoutesFromClickAPI(ctx, [one, two] = []) {
    try {

      const responseOne = await Task.getAll(one)

      const options = { weekday: 'short', month: 'numeric', day: 'numeric' }

      const nameValuesOne = responseOne.data.tasks.reverse().map((value, index) => {

        if (!value.start_date) {

          const timeStamp_Due = new Date(Number.parseInt(value.due_date))

          const time = timeStamp_Due.toLocaleTimeString([], { timeStyle: 'short' })
          const date = timeStamp_Due.toLocaleDateString([], options)

          return `${index + 1}. ${value.name}, по плану до ${time},${date}`

        } else {

          const timeStamp_Start = new Date(Number.parseInt(value.start_date))
          const timeStamp_Due = new Date(Number.parseInt(value.due_date))

          const timeStart = timeStamp_Start.toLocaleString([], { timeStyle: 'short' })
          const timeDue = timeStamp_Due.toLocaleString([], { timeStyle: 'short' })

          return `${index + 1}. ${value.name} c ${timeStart} до ${timeDue}`
        }
      })

      if (two) {

        const responseTwo = await Task.getAll(two)
        const nameValuesTwo = responseTwo.data.tasks.reverse().map((value, index) => {

          if (!value.start_date) {

            const timeStamp_Due = new Date(Number.parseInt(value.due_date))

            const time = timeStamp_Due.toLocaleTimeString([], { timeStyle: 'short' })
            const date = timeStamp_Due.toLocaleDateString([], options)

            return `${index + 1}. ${value.name}, по плану до ${time},${date}`
          } else {

            const timeStamp_Start = new Date(Number.parseInt(value.start_date))
            const timeStamp_Due = new Date(Number.parseInt(value.due_date))

            const timeStart = timeStamp_Start.toLocaleString([], { timeStyle: 'short' })
            const timeDue = timeStamp_Due.toLocaleString([], { timeStyle: 'short' })

            return `${index + 1}. ${value.name} c ${timeStart} до ${timeDue}`
          }
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
  getTaskIdArrFromApi: async function getTaskIdArrFromApi(list_id) {
    try {
      const response = await Task.getAll(list_id)
      const newArr = response.data.tasks.reverse().map(value => {
        return value.id
      })
      return newArr
    } catch (e) {
      console.log(e)
    }
  }
}
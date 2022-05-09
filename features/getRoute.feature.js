const
  routes = require('../lib/routesNew.json'),
  fs = require('fs'),
  json = JSON.stringify(routes),
  objByJson = JSON.parse(json),
  GetTasksService = require('../api/clickupApiTasks.service'),
  sendMessageError = require('../utils/sendMessageError');

module.exports = {

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

  getMessageRouteFromClickAPI: async function getMessageRoutesFromClickAPI(ctx, listId) {
    try {
      const response = await GetTasksService.getAllTasksFromList(listId)
      const nameValues = response.data.tasks.reverse().map((value, index) => {

        if (!value.start_date) {
          const tsCreate = new Date(Number.parseInt(value.date_created))
          return `${index + 1}. ${value.name}, время не указано, дата создания ${tsCreate.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}`
        } else {
          const tsStart = new Date(Number.parseInt(value.start_date))
          const tsDue = new Date(Number.parseInt(value.due_date))
          return `${index + 1}. ${value.name} c ${tsStart.toLocaleTimeString([], { timeStyle: 'short' })} до ${tsDue.toLocaleTimeString([], { timeStyle: 'short' })}`
        }
      })
      await ctx.reply(nameValues.join("\n\n"))
    } catch (e) {
      sendMessageError(ctx, e)
    }
  }
}
const
  routes = require('../lib/routesNew.json'),
  fs = require('fs'),
  json = JSON.stringify(routes),
  objByJson = JSON.parse(json),
  GetTasksService = require('../api/clickupApiTasks.service'),
  setting = JSON.parse(fs.readFileSync('./lib/setting.json')),
  sendMessageError = require('../utils/sendMessageError'),
  {
    listIdSupply,
    listIdCleaning
  } = setting;

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
      ${ctx.i18n.t('decoreRouteNumber')}
${filteredArr1.join("\n\n")};
________________
❖❖❖2 маршрут❖❖❖
________________
${filteredArr2.join("\n\n")}`
    } else {
      const filtered = objByJson.filter(obj => obj.route == 2);
      for (i in filtered) {
        targetArr.push(filtered[i].name);
      }
    }
    return `${targetArr.join("\n")} `
  },

  getMessageRouteSupplyFromClickAPI: async function getMessageRoutesFromClickAPI(ctx) {
    try {
      const response = await GetTasksService.getAllTasksFromList(listIdSupply)
      const nameValues = response.data.tasks.reverse().map((value, index) => {
        return `${index + 1}-${value.name}`
      })
      await ctx.reply(nameValues.join("\n\n"))
    } catch (e) {
      sendMessageError(ctx, e)
    }

  },

  getMessageRouteCleaningFromClickAPI: async function getMessageRouteCleaningFromClickAPI(ctx) {

    try {
      const response = await GetTasksService.getAllTasksFromList(listIdCleaning)
      const nameValues = response.data.tasks.reverse().map((value, index) => {
        return `${index + 1}-${value.name}`
      })
      await ctx.reply(nameValues.join("\n\n"))

    } catch (e) {
      sendMessageError(ctx, e)
    }
  }
}
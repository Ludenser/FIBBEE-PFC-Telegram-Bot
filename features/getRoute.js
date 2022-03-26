const routes = require('../lib/routesNew.json')
const json = JSON.stringify(routes);
const objByJson = JSON.parse(json)

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

  getMessageRoutes: function getMessageRoutes(numRoute) {

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
________________      
❖❖❖1 маршрут❖❖❖
________________ 
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
  }
}
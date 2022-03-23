const routes = require('./routesNew.json')

module.exports = {

  getObjRoutes: function getObjRoutes(numRoute) {
    let targetArr = [];
    if (numRoute == 1) {
      let route = routes[0].route_1;
      for (i in route) {
        newObj = Object.assign({ name: route[i].name }, { value: route[i].time });
        targetArr.push(newObj);
      }
    } else if (!numRoute) {
      return routes
    } else {
      let route = routes[0].route_2;
      for (i in route) {

        newObj = Object.assign({ name: route[i].name }, { value: route[i].time });
        targetArr.push(newObj);
      }
    }

    return targetArr
  },

  getMessageRoutes: function getMessageRoutes(numRoute) {
    let targetArr = [];
    if (numRoute == 1) {
      let route = routes[0].route_1;
      for (i in route) {
        newObj = Object.assign({ name: route[i].name }, { value: route[i].time });
        targetArr.push(newObj);
      }
    } else if (!numRoute) {

      for (i in routes) {
        console.log(i)
        newObj = Object.assign({ name: routes[i].route_1.name }, { value: routes[i].route_2.name });
        targetArr.push(newObj);
      }
    } else {
      let route = routes[0].route_2;
      for (i in route) {

        newObj = Object.assign({ name: route[i].name }, { value: route[i].time });
        targetArr.push(newObj);
      }
    }
    const updArray = targetArr.map((point, index) => {
      return `${point.name} ${point.value}`
    })
    return updArray
  }
}
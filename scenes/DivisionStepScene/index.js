const { Composer } = require('telegraf');
_ = require('lodash');
const openRouteComposer = require('./composers/openRoute.composer');
const closeRoute = require('./composers/closeRoute.composer');
const leaveScene = require('./composers/leaveScene.composer');

const divisionStep_scene = new Composer();
divisionStep_scene.use(
  closeRoute,
  leaveScene
)
divisionStep_scene.use(async (ctx, next) => {
  divisionStep_scene.use(
    ...openRouteComposer(ctx),
  )
  await next()
})
// divisionStep_scene.use(closeRoute)
// divisionStep_scene.use(leaveAction)

module.exports = divisionStep_scene;


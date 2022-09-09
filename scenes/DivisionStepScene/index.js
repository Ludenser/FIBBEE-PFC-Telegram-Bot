const { Composer } = require('telegraf');
_ = require('lodash');
const openRouteComposer = require('./composers/openRoute.composer');
const closeRoute = require('./composers/closeRoute.composer');
const leaveAction = require('./composers/leaveAction.composer');
const divisionSceneTextHandler = require('./handlers/text.handler');
const divisionScenePhotoHandler = require('./handlers/photo.handler');

/**
 * Сцена распределения роутов.
 *
 * Запуск таймера главного чек/листа, перевод главного чеклиста в in progress, выдача клавиатуры с просьбой загрузить фото автомобиля
 *
 */

const divisionStep_scene = new Composer();

divisionStep_scene.use(divisionSceneTextHandler())
divisionStep_scene.use(divisionScenePhotoHandler())
divisionStep_scene.use(async (ctx, next) => {
  divisionStep_scene.use(...openRouteComposer(ctx))
  await next()
})
divisionStep_scene.use(closeRoute)
divisionStep_scene.use(leaveAction)

module.exports = divisionStep_scene;


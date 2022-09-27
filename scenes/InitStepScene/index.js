const { Composer } = require('telegraf');
const leaveScene = require('./composers/leaveScene.composer');
const getStart = require('./composers/getStart.composer');
const initScenePhotoHandler = require('./handlers/photo.handler');
const initSceneTextHandler = require('./handlers/text.handler');

/**
 * Сцена инициализации назначенного роута.
 *
 * Обработка загрузки фото автомобиля. Переход в сцену маршрута.
 */


const initStepScene = new Composer();

initStepScene.use(
  initScenePhotoHandler(),
  initSceneTextHandler(),
  getStart,
  leaveScene
)


module.exports = initStepScene



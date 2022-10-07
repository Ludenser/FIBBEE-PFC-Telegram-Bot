const { Composer } = require('telegraf');
const leaveScene = require('./composers/leaveScene.composer');
const getStart = require('./composers/getStart.composer');

/**
 * Сцена инициализации назначенного роута.
 *
 * Обработка загрузки фото автомобиля. Переход в сцену маршрута.
 */


const initStepScene = new Composer();

initStepScene.use(
  getStart,
  leaveScene
)


module.exports = initStepScene



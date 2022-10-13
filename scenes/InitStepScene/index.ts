import { SessionCtx } from '../../global';
import { Composer } from 'telegraf';
import leaveScene from './composers/leaveScene.composer';
import getStart from './composers/getStart.composer';

/**
 * Сцена инициализации назначенного роута.
 *
 * Обработка загрузки фото автомобиля. Переход в сцену маршрута.
 */

const initStepScene = new Composer<SessionCtx>();

initStepScene.use(
  getStart,
  leaveScene
)

export default initStepScene



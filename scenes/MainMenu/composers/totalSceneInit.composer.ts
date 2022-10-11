import { SessionCtx } from '../../../global';
import { Composer, Scenes } from 'telegraf';
import { complexScene } from '../../../wizards/complex.wizard';
import { initialScene } from '../../../wizards/route.wizard';

/**
  * Динамическое создание Wizard`а со сценами из таск.листа ClickUp.
  * 
  * Главная регистрация всех сцен бота.
  */
export default (ctx: SessionCtx) => {

  const totalSceneInitComposer = new Composer();
  const stage = new Scenes.Stage([initialScene, ...complexScene(ctx)])

  totalSceneInitComposer.use(stage.middleware())
  return totalSceneInitComposer
}
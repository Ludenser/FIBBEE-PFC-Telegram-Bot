import { SessionCtx } from '../global';
import { Scenes } from 'telegraf';
import _ from 'lodash';
import { complexSceneComposer } from '../scenes/ComplexScene/index';

/**
  * Сцена инициализации роутов.
  */
export const complexScene = (ctx: SessionCtx) => {

  const wizardScene = _(ctx.session.all_lists)
    .map((list, i) => {
      return new Scenes.WizardScene(`${i}`, ...complexSceneComposer(ctx.session.all_lists[i].tasksWithoutDriverTaskAndSide, list.driverTask[0]))
    })
    .value()
  return wizardScene
}

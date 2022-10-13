import { SessionCtx, Task } from '../../global';
import { Composer } from 'telegraf';
import _ from 'lodash';
import textActionHandlerComposer from './handlers/text.handler';
import complexSceneCustomFieldsActions from './composers/customFields.composer';
import complexScenePhotoProcess from './composers/photoProcess.composer';
import complexSceneEnterActions from './composers/enter.composer';
import complexSceneCommentActions from './composers/comment.composer';
import complexSceneNextStepActions from './composers/nextStep.composer';
import complexSceneExitActions from './composers/exit.composer';
import complexSceneSideTaskActions from './composers/sideTask.composer';
import complexScenePhotoHandler from './handlers/photo.handler';

/**
 * Сцена обслуживания комплекса.
 * @param {Task[]} tasks - таски без таска водителя-оператора
 * @param {Task} driverTask - таск водителя-оператора
 */

export const complexSceneComposer = (tasks: Task[], driverTask: Task) => {
  const complexSceneArray = _(tasks)
    .map((task, i) => {
      const complex_scene = new Composer<SessionCtx>();
      complex_scene.use(async (ctx, next) => {

        if (ctx.session.all_lists[ctx.session.currentRouteNumber].hasOwnProperty('sideTasks')) {
          complex_scene.use(complexSceneSideTaskActions(ctx, task.id, task.name, task),)
        }
        await next()
      })
      complex_scene.use(complexSceneEnterActions(task.id, task.name, task))
      complex_scene.use(
        textActionHandlerComposer(),
        complexScenePhotoHandler(),
        complexSceneNextStepActions(tasks, task, driverTask.id),
        complexSceneExitActions(task.id, task.checklists, driverTask.id),
        complexScenePhotoProcess(task.id, task.name, task),
        complexSceneCommentActions(task, task.name),
        complexSceneCustomFieldsActions(task.id),
      )


      // complex_scene.action('leaveScene', async (ctx) => {
      //   const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      //   try {
      //     // await ClickAPI.TimeTracking.stopEntry(task.id);
      //     // await ClickAPI.Tasks.setStatus(task.id, 'to do');
      //     // await ClickAPI.Tasks.setStatus(driverTask.id, 'to do');
      //     // await resolveAllCheckListsAndItems(task.checklists, 'false', ctx.session.user.CU_Token);
      //     // await resolveAllCheckListsAndItems(driverTask.checklists, 'false', ctx.session.user.CU_Token);

      //     await ctx.deleteMessage();
      //     ctx.session.currentRouteNumber = null;

      //     await ctx.wizard.back();
      //   } catch (e) {
      //     await sendError(ctx, e);
      //     await sendMessageDriverMenu(ctx);
      //     await ctx.scene.leave();
      //   }
      // });

      return complex_scene;
    })
    .value()

  return complexSceneArray;
};

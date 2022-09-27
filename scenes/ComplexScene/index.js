const { Composer } = require('telegraf');
const _ = require('lodash');
const textActionHandlerComposer = require('./handlers/text.handler');
const complexSceneCustomFieldsActions = require('./composers/customFields.composer');
const complexScenePhotoProcess = require('./composers/photoProcess.composer');
const complexSceneEnterActions = require('./composers/enter.composer');
const complexSceneCommentActions = require('./composers/comment.composer');
const complexSceneNextStepActions = require('./composers/nextStep.composer');
const complexSceneExitActions = require('./composers/exit.composer');
const complexSceneSideTaskActions = require('./composers/sideTask.composer');
const complexScenePhotoHandler = require('./handlers/photo.handler');

/**
 * Сцена обслуживания комплекса.
 * Динамически создается на основании массива тасков из API
 * @param {[Object]} tasks - массив с обьектами тасков без главного таска водителя-оператора
 * @param {[Object]} driverTask - массив с обьектами тасков текущего таск-листа
 */

module.exports = (tasks, driverTask) => {
  const complexSceneArray = _(tasks)
    .map((task, i) => {
      const complex_scene = new Composer();
      complex_scene.use(complexSceneEnterActions(task.id, task.name, task))
      complex_scene.use(
        textActionHandlerComposer(task.id),
        complexScenePhotoHandler(),
        complexSceneNextStepActions(tasks, task, driverTask.id),
        complexSceneExitActions(task.id, task.checklists, driverTask.id),
        complexScenePhotoProcess(task.id, task.name),
        complexSceneCommentActions(task.id, task.name),
        complexSceneCustomFieldsActions(task.id),
      )
      complex_scene.use(async (ctx, next) => {

        if (ctx.session.all_lists[ctx.session.currentRouteNumber].hasOwnProperty('sideTasks')) {
          complex_scene.use(complexSceneSideTaskActions(ctx, task.id, task.name, task),)
        }
        await next()
      })

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
    });

  return complexSceneArray;
};

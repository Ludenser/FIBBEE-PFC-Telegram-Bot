const { Composer } = require('telegraf');
const _ = require('lodash');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const setAssigneeFeature = require('../features/setAssignee.feature');
const sendMessageRouteEnter = require('../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const sendMessageRouteEnterEx = require('../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnterEx.scene');
const { sendError } = require('../utils/sendLoadings');
const { resolveAllCheckListsAndItems, } = require('../features/resolveCheckList.feature');
const Clickup = require('../api/index');
const sendMessageComment = require('../keyboards/scenes/complexSceneKeyboards/sendMessageComment.scene');
const sendMessageNextStep = require('../keyboards/scenes/complexSceneKeyboards/sendMessageNextStep.scene');
const getAttentionFeature = require('../features/getAttention.feature');
const textActionHandlerComposer = require('./complexSceneComposers/complexSceneText.composer');
const complexSceneCustomFieldsActionsHandler = require('./complexSceneComposers/complexSceneCustomFields.composer');
const deleteMessagesById = require('../utils/deleteMessagesById');
const complexScenePhotoAction = require('./complexSceneComposers/complexScenePhotoAction.composer');

const complexSceneEnterHandler = require('./complexSceneComposers/complexSceneEnter.composer');
const complexSceneCommentHandler = require('./complexSceneComposers/complexSceneComment.composer');
const complexSceneNextStepHandler = require('./complexSceneComposers/complexSceneNextStep.composer');
const complexSceneExitHandler = require('./complexSceneComposers/complexSceneExit.composer');
const complexSceneSideTaskActionsHandler = require('./complexSceneComposers/complexSceneSideTask.composer');
const complexScenePhotoHandler = require('./complexSceneComposers/complexScenePhotoHandlers.composer');

/**
 * Сцена обслуживания комплекса.
 * Динамически создается на основании массива тасков из API
 * @param {[Object]} tasks - массив с обьектами тасков без главного таска водителя-оператора
 * @param {[Object]} driverTask - массив с обьектами тасков текущего таск-листа
 */

module.exports = (tasks, driverTask) => {
  const complexSceneArray = _(tasks).map((task, i) => {
    const complex_scene = new Composer();

    complex_scene.use(textActionHandlerComposer(task.id))
    complex_scene.use(complexScenePhotoHandler())
    complex_scene.use(complexSceneEnterHandler(task.id, task.name, task))
    complex_scene.use(complexSceneNextStepHandler(tasks, task, driverTask.id))
    complex_scene.use(complexSceneExitHandler(task.id, task.checklists, driverTask.id))
    complex_scene.use(complexScenePhotoAction(task.id, task.name))
    complex_scene.use(complexSceneCommentHandler(task.id, task.name))
    complex_scene.use(complexSceneCustomFieldsActionsHandler(task.id))
    complex_scene.use(async (ctx, next) => {
      complex_scene.use(...complexSceneSideTaskActionsHandler(ctx, task.id, task.name, task))
      await next()
    })

    complex_scene.action('leaveScene', async (ctx) => {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      try {
        await ClickAPI.TimeTracking.stopEntry(task.id);
        await ClickAPI.Tasks.setStatus(task.id, 'to do');
        await ClickAPI.Tasks.setStatus(driverTask.id, 'to do');
        await resolveAllCheckListsAndItems(task.checklists, 'false', ctx.session.user.CU_Token);
        await resolveAllCheckListsAndItems(driverTask.checklists, 'false', ctx.session.user.CU_Token);

        await ctx.deleteMessage();
        ctx.session.currentRouteNumber = null;
        await sendMessageDriverMenu(ctx);
        await ctx.scene.leave();
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageDriverMenu(ctx);
        await ctx.scene.leave();
      }
    });

    return complex_scene;
  });

  return complexSceneArray;
};

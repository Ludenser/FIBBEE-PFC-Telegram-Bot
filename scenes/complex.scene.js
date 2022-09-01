const { Composer } = require('telegraf');
const _ = require('lodash');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const setAssigneeFeature = require('../features/setAssignee.feature');
const sendMessageRouteEnter = require('../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const sendMessageRouteEnterEx = require('../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnterEx.scene');
const { sendError } = require('../utils/sendLoadings');
const { resolveAllCheckListsAndItems, } = require('../features/resolveCheckList.feature');
const { postAttachments } = require('../features/postAttachments.feature');
const Clickup = require('../api/index');
const sendMessageComment = require('../keyboards/scenes/complexSceneKeyboards/sendMessageComment.scene');
const sendMessageNextStep = require('../keyboards/scenes/complexSceneKeyboards/sendMessageNextStep.scene');
const getAttentionFeature = require('../features/getAttention.feature');
const sendMessagePhoto = require('../keyboards/scenes/complexSceneKeyboards/sendMessagePhoto.scene');
const sendMessageCustomFieldEditScene = require('../keyboards/scenes/complexSceneKeyboards/sendMessageCustomFieldEdit.scene');
const textActionHandlerComposer = require('./complexSceneComposers/complexSceneText.composer');
const sendMessageEditCustomFieldHelperScene = require('../keyboards/scenes/complexSceneKeyboards/sendMessageEditCustomFieldHelper.scene');
const { removeCustom_field } = require('../features/editCustomFields.feature');
const complexSceneCustomFieldsActionsHandler = require('./complexSceneComposers/complexSceneCustomFields.composer');
const deleteMessagesById = require('../utils/deleteMessagesById');

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
    complex_scene.use(complexSceneCustomFieldsActionsHandler(task.id))

    complex_scene.action('enter', async (ctx) => {

      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      ctx.session.states.currentMenuState = 'main'
      try {
        await ctx.deleteMessage();
        await ClickAPI.Tasks.setStatus(task.id, 'in progress');
        await ClickAPI.TimeTracking.startEntry(task.id);
        await setAssigneeFeature(ctx.session.userName, task.id, ctx.session.user.CU_Token);
        await sendMessageRouteEnter(ctx, task.name, task.id);
        await getAttentionFeature(ctx, task.id);

      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnter(ctx, task.name, task.id);
      }
    });

    complex_scene.action('reenter', async (ctx) => {
      ctx.session.states.currentMenuState = 'main'
      try {
        await ctx.deleteMessage();
        await sendMessageRouteEnter(ctx, task.name, task.id);
        await getAttentionFeature(ctx, task.id);
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnter(ctx, task.name, task.id);
      }
    });

    complex_scene.action('upl_photo', async (ctx) => {
      ctx.session.states.currentMenuState = 'photo'
      ctx.session.states.isPhotoMenu = true
      try {
        await ctx.deleteMessage();
        ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
        await sendMessagePhoto(ctx, task.name)
        const filter = (ctx, next) => ctx.session.states.isPhotoMenu && next()
        complex_scene.on('photo', filter, async (ctx) => {
          await postAttachments(ctx, task.id);
        });
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnter(ctx, task.name, task.id);
      }
    });

    complex_scene.action('upl_comment', async (ctx) => {
      ctx.session.states.isMainMenu = false
      ctx.session.states.currentMenuState = 'comment'
      ctx.session.states.isCommentMenu = true
      try {
        ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
        await ctx.deleteMessage();
        await sendMessageComment(ctx);
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnter(ctx, task.name, task.id);
      }

    });

    complex_scene.action('next_step', async (ctx) => {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);

      try {
        ctx.session.states.attention_msg_id = await deleteMessagesById(ctx, ctx.session.states.attention_msg_id)
        await ClickAPI.Tasks.setStatus(task.id, 'done');
        await ClickAPI.TimeTracking.stopEntry(task.id);
        await resolveAllCheckListsAndItems(task.checklists, 'true', ctx.session.user.CU_Token);
        await ClickAPI.TimeTracking.startEntry(driverTask.id);

        await ctx.deleteMessage();
        await sendMessageNextStep(ctx, task.name, tasks[i + 1].name);
        await ctx.wizard.next();
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnter(ctx, task.name, task.id);
      }
    });

    complex_scene.action('exit', async (ctx) => {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      try {
        await ClickAPI.Tasks.setStatus(task.id, 'done');
        await ClickAPI.TimeTracking.stopEntry(task.id);
        await ClickAPI.TimeTracking.startEntry(driverTask.id);
        await resolveAllCheckListsAndItems(task.checklists, 'true', ctx.session.user.CU_Token);

        await ctx.deleteMessage();
        await sendMessageRouteEnterEx(ctx);
        await ctx.scene.enter('INITIAL_WIZARD_ID');
      } catch (e) {
        await sendError(ctx, e);
        await sendMessageRouteEnterEx(ctx);
        await ctx.scene.enter('INITIAL_WIZARD_ID');
      }
    });

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

const { Composer } = require('telegraf');
const Clickup = require('../../api');
const getAttentionFeature = require('../../features/getAttention.feature');
const setAssigneeFeature = require('../../features/setAssignee.feature');
const sendMessagePrevComplexScene = require('../../keyboards/scenes/complexSceneKeyboards/sendMessagePrevComplex.scene');
const sendMessageRouteEnterScene = require('../../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const { sendError } = require('../../utils/sendLoadings');

const complexSceneEnterHandler = (task_id, task_name, task) => {
  const composer = new Composer()

  composer.action('enter', async (ctx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      ctx.session.states.currentTask_discordWebHook = task.custom_fields.find(o => o.name === 'Discord_WebHook').value
      ctx.session.states.currentMenuState = 'main'
      ctx.session.states.currentLocationName = task_name
      ctx.session.states.currentTask_id = task_id
      ctx.session.states.currentList_id = task.list.id
      await ctx.deleteMessage();
      await ClickAPI.Tasks.setStatus(task_id, 'in progress');
      await ClickAPI.TimeTracking.startEntry(task_id);
      await setAssigneeFeature(ctx.session.userName, task_id, ctx.session.user.CU_Token);
      await sendMessageRouteEnterScene(ctx, task, task_name);
      await getAttentionFeature(ctx, task_id);

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  });

  composer.action('reenter', async (ctx) => {

    try {
      ctx.session.states.currentMenuState = 'main'
      await ctx.deleteMessage();
      await sendMessageRouteEnterScene(ctx, task, task_name);
      await getAttentionFeature(ctx, task_id);
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  });

  composer.action('back', async (ctx) => {

    try {
      await ctx.wizard.back();
      await sendMessagePrevComplexScene(ctx)
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  });



  return composer
}

module.exports = complexSceneEnterHandler
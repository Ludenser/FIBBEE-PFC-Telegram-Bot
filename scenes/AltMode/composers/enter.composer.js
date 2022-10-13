const { Composer } = require('telegraf');
const { Clickup } = require('../../../api');
const getAttentionFeature = require('../../../features/getAttention.feature');
const setAssigneeFeature = require('../../../features/setAssignee.feature');
const sendMessageRouteEnterScene = require('../keyboards/sendMessageRouteEnter.keyboard');
const { menu_states } = require('../../../config/otherSettings');
const { sendError } = require('../../../utils/sendLoadings');
const { enterComposerActions: Actions } = require('../actions');

const complexSceneEnterHandler = (task_id, task_name, task) => {
  const composer = new Composer()

  composer.action(`${task_id}`, async (ctx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      ctx.session.states.current.task.discordWebHook = task.custom_fields.find(o => o.name === 'Discord_WebHook').value
      ctx.session.states.current.menu_state = menu_states.MAIN
      ctx.session.states.current.task.locationName = task_name
      ctx.session.states.current.task.id = task_id
      ctx.session.states.current.list_id = task.list.id
      console.log(task.name);
      await ctx.deleteMessage();
      await ClickAPI.Tasks.setStatus(task_id, 'in progress');
      await ClickAPI.TimeTracking.startEntry(task_id);
      await setAssigneeFeature(ctx.session.userName, task_id, ctx.session.user.CU_Token);
      await sendMessageRouteEnterScene(ctx, task, task_name);
      await getAttentionFeature(ctx, task_id);
      composer.action(`${Actions.REENTER}${ctx.session.states.current.task.id}`, async (ctx) => {

        try {
          ctx.session.states.current.menu_state = menu_states.MAIN
          await ctx.deleteMessage();
          await sendMessageRouteEnterScene(ctx, task, task_name);
          await getAttentionFeature(ctx, task_id);
        } catch (e) {
          await sendError(ctx, e);
          await sendMessageRouteEnterScene(ctx, task, task_name);
        }
      });
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task_name);
    }
  });



  return composer
}

module.exports = complexSceneEnterHandler
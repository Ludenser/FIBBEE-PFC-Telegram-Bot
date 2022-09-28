const { Composer } = require('telegraf');
const Clickup = require('../../../api');
const { resolveAllCheckListsAndItems } = require('../../../features/resolveCheckList.feature');
const sendMessageRouteEnterExScene = require('../keyboards/sendMessageRouteEnterEx.keyboard');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');
const { exitComposerActions: Actions } = require('../actions');

const complexSceneExitHandler = (task_id, task_checklists, driverTask_id) => {
  const composer = new Composer()

  composer.action(`${Actions.EXIT}${task_id}`, async (ctx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      if (!ctx.session.states.attention_msg.isDeleted) {
        ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id)
      }
      await ClickAPI.Tasks.setStatus(task_id, 'done');
      await ClickAPI.TimeTracking.stopEntry(task_id);
      await ClickAPI.TimeTracking.startEntry(driverTask_id);
      await resolveAllCheckListsAndItems(task_checklists, 'true', ctx.session.user.CU_Token);
      await ctx.deleteMessage();
      await sendMessageRouteEnterExScene(ctx);

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterExScene(ctx);
    }
  });

  return composer
}

module.exports = complexSceneExitHandler

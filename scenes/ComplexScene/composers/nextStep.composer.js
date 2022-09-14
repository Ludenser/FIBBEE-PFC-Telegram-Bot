const { Composer } = require('telegraf');
const Clickup = require('../../../api');
const { resolveAllCheckListsAndItems } = require('../../../features/resolveCheckList.feature');
const sendMessageNextStepScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageNextStep.scene');
const sendMessageRouteEnterScene = require('../../../keyboards/scenes/complexSceneKeyboards/sendMessageRouteEnter.scene');
const deleteMessagesById = require('../../../utils/deleteMessagesById');
const { sendError } = require('../../../utils/sendLoadings');

const NEXT_STEP = 'next_step'

const complexSceneNextStepHandler = (tasks, task, driverTask_id) => {
  const composer = new Composer()

  composer.action(NEXT_STEP, async (ctx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      if (!ctx.session.states.attention_msg.isDeleted) {
        ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      }
      await ClickAPI.Tasks.setStatus(task.id, 'done');
      await ClickAPI.TimeTracking.stopEntry(task.id);
      await resolveAllCheckListsAndItems(task.checklists, 'true', ctx.session.user.CU_Token);
      await ClickAPI.TimeTracking.startEntry(driverTask_id);

      await ctx.deleteMessage();
      await sendMessageNextStepScene(ctx, task.name, tasks[tasks.indexOf(task) + 1].name);
      await ctx.wizard.next();
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task.name, task.id);
    }
  });

  return composer
}

module.exports = complexSceneNextStepHandler
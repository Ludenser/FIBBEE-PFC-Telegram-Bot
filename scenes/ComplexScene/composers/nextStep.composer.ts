import { Composer } from 'telegraf';
import { Clickup } from '../../../api';
import { resolveAllCheckListsAndItems } from '../../../features/resolveCheckList.feature';
import sendMessageNextStepScene from '../keyboards/sendMessageNextStep.keyboard';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { nextStepComposerActions as Actions } from '../actions';
import sendMessageReminderKeyboard from '../keyboards/sendMessageReminder.keyboard';
import { SessionCtx, Task } from '../../../global';

const complexSceneNextStepHandler = (tasks: Task[], task: Task, driverTask_id: string) => {
  const composer = new Composer<SessionCtx>()

  composer.action(Actions.NEXT_STEP, async (ctx) => {

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
      await sendMessageReminderKeyboard(ctx)
      await sendMessageNextStepScene(ctx, task.name, tasks[tasks.indexOf(task) + 1].name);
      await ctx.wizard.next();
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterScene(ctx, task, task.name);
    }
  });

  return composer
}

export default complexSceneNextStepHandler
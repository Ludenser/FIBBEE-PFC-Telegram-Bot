import { Composer } from 'telegraf';
import { Clickup } from '../../../api';
import { resolveAllCheckListsAndItems } from '../../../features/resolveCheckList.feature';
import { Checklist, SessionCtx } from '../../../global';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { exitComposerActions as Actions } from '../actions';
import sendMessageALtModeTasksKeyboard from '../keyboards/sendMessageALtModeTasks.keyboard';

const complexSceneExitHandler = (task_id: string, task_checklists: Checklist[]) => {
  const composer = new Composer<SessionCtx>()

  composer.action(`${Actions.EXIT}${task_id}`, async (ctx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      if (!ctx.session.states.attention_msg.isDeleted) {
        ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      }
      await ClickAPI.Tasks.setStatus(task_id, 'done');
      await ClickAPI.TimeTracking.stopEntry(task_id);
      await resolveAllCheckListsAndItems(task_checklists, 'true', ctx.session.user.CU_Token);
      await ctx.deleteMessage();
      await sendMessageALtModeTasksKeyboard(ctx)

    } catch (e) {
      await sendError(ctx, e);
      await sendMessageALtModeTasksKeyboard(ctx)
    }
  });

  return composer
}

export default complexSceneExitHandler
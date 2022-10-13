import { Checklist, SessionCtx } from '../../../global';
import { Composer } from 'telegraf';
import { Clickup } from '../../../api';
import { resolveAllCheckListsAndItems } from '../../../features/resolveCheckList.feature';
import sendMessageRouteEnterExScene from '../keyboards/sendMessageRouteEnterEx.keyboard';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { exitComposerActions as Actions } from '../actions';

const complexSceneExitHandler = (task_id: string, task_checklists: Checklist[], driverTask_id: string) => {
  const composer = new Composer<SessionCtx>()

  composer.action(Actions.EXIT, async (ctx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      if (!ctx.session.states.attention_msg.isDeleted) {
        ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
      }
      await ClickAPI.Tasks.setStatus(task_id, 'done');
      await ClickAPI.TimeTracking.stopEntry(task_id);
      await ClickAPI.TimeTracking.startEntry(driverTask_id);
      await resolveAllCheckListsAndItems(task_checklists, 'true', ctx.session.user.CU_Token);

      await ctx.deleteMessage();
      await sendMessageRouteEnterExScene(ctx);
      await ctx.scene.enter('INITIAL_WIZARD_ID');
    } catch (e) {
      await sendError(ctx, e);
      await sendMessageRouteEnterExScene(ctx);
      await ctx.scene.enter('INITIAL_WIZARD_ID');
    }
  });

  return composer
}

export default complexSceneExitHandler
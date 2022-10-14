import { SessionCtx, Task } from '../../../global';
import { Composer } from 'telegraf';
import { Clickup } from '../../../api';
import getAttentionFeature from '../../../features/getAttention.feature';
import setAssigneeFeature from '../../../features/setAssignee.feature';
import sendMessageRouteEnterScene from '../keyboards/sendMessageRouteEnter.keyboard';
import { menu_states } from '../../../config/otherSettings';
import { sendError } from '../../../utils/sendLoadings';
import { enterComposerActions as Actions } from '../actions';

const complexSceneEnterHandler = (task_id: string, task_name: string, task: Task) => {
  const composer = new Composer<SessionCtx>()

  composer.action(`${task_id}`, async (ctx: SessionCtx) => {

    try {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      const discordWebHook = task.custom_fields.find(o => o.name === 'Discord_WebHook').value
      if (!Array.isArray(discordWebHook)) {
        ctx.session.states.current.task.discordWebHook = discordWebHook
      }
      ctx.session.states.current.menu_state = menu_states.MAIN
      ctx.session.states.current.task.locationName = task_name
      ctx.session.states.current.task.id = task_id
      ctx.session.states.current.list_id = task.list.id
      console.log(task.name);
      await ctx.deleteMessage();
      await ClickAPI.Tasks.setStatus(task_id, 'in progress');
      await ClickAPI.TimeTracking.startEntry(task_id);
      await setAssigneeFeature(ctx.session.clickUpUser.id, task_id, ctx.session.user.CU_Token);
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
export default complexSceneEnterHandler
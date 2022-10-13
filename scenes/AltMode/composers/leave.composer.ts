import { Composer } from 'telegraf';
import { Clickup } from '../../../api';
import { SessionCtx } from '../../../global';
import deleteMessagesById from '../../../utils/deleteMessagesById';
import { sendError } from '../../../utils/sendLoadings';
import { exitComposerActions as Actions } from '../actions';
import sendMessageALtModeTasksKeyboard from '../keyboards/sendMessageALtModeTasks.keyboard';

const complexSceneLeaveHandler = (task_id: string) => {
    const composer = new Composer<SessionCtx>()

    composer.action(`${Actions.LEAVE}${task_id}`, async (ctx) => {

        try {
            const ClickAPI = new Clickup(ctx.session.user.CU_Token);
            if (!ctx.session.states.attention_msg.isDeleted) {
                ctx.session.states.attention_msg.id = await deleteMessagesById(ctx, ctx.session.states.attention_msg.id, ctx.session.states.attention_msg.isDeleted)
            }
            await ClickAPI.Tasks.setStatus(task_id, 'to do');
            await ClickAPI.TimeTracking.stopEntry(task_id);
            await ctx.deleteMessage();
            await sendMessageALtModeTasksKeyboard(ctx)

        } catch (e) {
            await sendError(ctx, e);
            await sendMessageALtModeTasksKeyboard(ctx)
        }
    });

    return composer
}

export default complexSceneLeaveHandler
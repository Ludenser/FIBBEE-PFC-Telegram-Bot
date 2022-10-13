import { SessionCtx } from '../../global';
import { Composer } from 'telegraf';
import _ from 'lodash';
import altModeSceneCustomFieldsActions from './composers/customFields.composer';
import altModeScenePhotoProcess from './composers/photoProcess.composer';
import altModeSceneEnterActions from './composers/enter.composer';
import altModeSceneCommentActions from './composers/comment.composer';
import altModeSceneSideTaskActions from './composers/sideTask.composer';
import altModeSceneExitActions from './composers/exit.composer';

export default (ctx: SessionCtx) => {
    const altMode_sceneComposers = ctx.session.all_lists[ctx.session.currentRouteNumber].tasksWithoutDriverTaskAndSide.map(task => {
        const altMode_scene = new Composer<SessionCtx>();
        if (ctx.session.all_lists[ctx.session.currentRouteNumber].hasOwnProperty('sideTasks')) {
            altMode_scene.use(altModeSceneSideTaskActions(ctx, task.id, task.name, task),)
        }
        altMode_scene.use(altModeSceneEnterActions(task.id, task.name, task))
        altMode_scene.use(
            altModeScenePhotoProcess(task.id, task.name, task),
            altModeSceneCommentActions(task, task.id),
            altModeSceneCustomFieldsActions(task.id),
            altModeSceneExitActions(task.id, task.checklists)
        )




        // altMode_scene.action('leaveScene', async (ctx) => {
        //   const ClickAPI = new Clickup(ctx.session.user.CU_Token);
        //   try {
        //     // await ClickAPI.TimeTracking.stopEntry(task.id);
        //     // await ClickAPI.Tasks.setStatus(task.id, 'to do');
        //     // await ClickAPI.Tasks.setStatus(driverTask.id, 'to do');
        //     // await resolveAllCheckListsAndItems(task.checklists, 'false', ctx.session.user.CU_Token);
        //     // await resolveAllCheckListsAndItems(driverTask.checklists, 'false', ctx.session.user.CU_Token);

        //     await ctx.deleteMessage();
        //     ctx.session.currentRouteNumber = null;

        //     await ctx.wizard.back();
        //   } catch (e) {
        //     await sendError(ctx, e);
        //     await sendMessageDriverMenu(ctx);
        //     await ctx.scene.leave();
        //   }
        // });
        return altMode_scene;
    });
    return altMode_sceneComposers;
};

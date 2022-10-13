import { SessionCtx } from '../../global';
import { Composer } from 'telegraf';
import _ from 'lodash';
import altModeSceneCustomFieldsActions from './composers/customFields.composer';
import altModeScenePhotoProcess from './composers/photoProcess.composer';
import altModeSceneEnterActions from './composers/enter.composer';
import altModeSceneCommentActions from './composers/comment.composer';
import altModeSceneSideTaskActions from './composers/sideTask.composer';
import altModeSceneExitActions from './composers/exit.composer';
import altModeSceneLeaveActions from './composers/leave.composer'

export default (ctx: SessionCtx) => {
    const altMode_sceneComposers = ctx.session.all_lists[ctx.session.currentRouteNumber].allTasksWithoutSide.map(task => {
        const altMode_scene = new Composer<SessionCtx>();
        if (ctx.session.all_lists[ctx.session.currentRouteNumber].hasOwnProperty('sideTasks')) {
            altMode_scene.use(altModeSceneSideTaskActions(ctx, task.id, task.name, task),)
        }
        altMode_scene.use(altModeSceneEnterActions(task.id, task.name, task))
        altMode_scene.use(
            altModeScenePhotoProcess(task.id, task.name, task),
            altModeSceneCommentActions(task, task.id),
            altModeSceneCustomFieldsActions(task.id),
            altModeSceneExitActions(task.id, task.checklists),
            altModeSceneLeaveActions(task.id),
        )
        return altMode_scene;
    });
    return altMode_sceneComposers;
};

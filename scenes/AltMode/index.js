const { Composer } = require('telegraf');
const _ = require('lodash');
const textActionHandler = require('./handlers/text.handler');
const photoActionHandler = require('./handlers/photo.handler');
const altModeSceneCustomFieldsActions = require('./composers/customFields.composer');
const altModeScenePhotoProcess = require('./composers/photoProcess.composer');
const altModeSceneEnterActions = require('./composers/enter.composer');
const altModeSceneCommentActions = require('./composers/comment.composer');
const altModeSceneSideTaskActions = require('./composers/sideTask.composer');

/**
 * Сцена обслуживания комплекса.
 * Динамически создается на основании массива тасков из API
 * @param {[Object]} tasks - массив с обьектами тасков без главного таска водителя-оператора
 * @param {[Object]} driverTask - массив с обьектами тасков текущего таск-листа
 */

module.exports = (ctx) => {


    const altMode_sceneComposers = ctx.session.all_lists[ctx.session.currentRouteNumber].tasksWithoutDriverTaskAndSide.map(task => {
        const altMode_scene = new Composer();
        altMode_scene.use(altModeSceneEnterActions(task.id, task.name, task))
        altMode_scene.use(
            altModeScenePhotoProcess(task.id, task.name),
            altModeSceneCommentActions(task.id),
            altModeSceneCustomFieldsActions(task.id),
        )
        if (ctx.session.all_lists[ctx.session.currentRouteNumber].hasOwnProperty('sideTasks')) {
            altMode_scene.use(altModeSceneSideTaskActions(ctx, task.id, task.name, task),)
        }



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

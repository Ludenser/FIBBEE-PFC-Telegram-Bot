const { Composer, Markup } = require('telegraf');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const { sendError } = require('../utils/sendLoadings');
const { postAttachments } = require('../features/postAttachments.feature');
const Clickup = require('../api');
const sendMessageInitKeyboardInitStep = require('../keyboards/scenes/initStepSceneKeyboards/sendMessageInitKeyboard.initStep');

/**
 * Сцена инициализации назначенного роута.
 *
 * Обработка фото рабочего автомобиля. Открытие роута.
 */

module.exports = (ctx) => {
    const initStepScene = new Composer();

    const init = _(ctx.session.all_lists)
        .map(el => {
            initStepScene.on('photo', async (ctx) => {
                try {
                    await postAttachments(ctx, ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id);
                } catch (error) {
                    await sendError(ctx, error)
                }

            });

            initStepScene.action('get_start', async (ctx) => {
                await ctx.deleteMessage();
                await sendMessageInitKeyboardInitStep(ctx)
                await ctx.scene.enter(
                    `ROUTE_${ctx.session.currentRouteNumber}_WIZARD_ID`
                );
            });

            initStepScene.action('leaveScene', async (ctx) => {
                const ClickAPI = new Clickup(ctx.session.user.CU_Token);
                try {
                    await ClickAPI.TimeTracking.stopEntry(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id);
                    await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id, 'to do');

                    ctx.session.currentRouteNumber = null;
                    await ctx.deleteMessage();
                    await sendMessageDriverMenu(ctx);
                    await ctx.scene.leave();
                } catch (e) {
                    await sendError(ctx, e);
                    await sendMessageDriverMenu(ctx);
                    await ctx.scene.leave();
                }
            });
            return initStepScene;
        });
    return init;
};

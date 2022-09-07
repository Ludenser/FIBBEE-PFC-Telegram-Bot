const { Composer, Markup } = require('telegraf');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const { sendError, sendProses } = require('../utils/sendLoadings');
const { postAttachments } = require('../features/postAttachments.feature');
const sendMessageInitKeyboardInitStep = require('../keyboards/scenes/initStepSceneKeyboards/sendMessageInitKeyboard.initStep');

const Clickup = require('../api');

/**
 * Сцена инициализации назначенного роута.
 *
 * Обработка загрузки фото автомобиля. Переход в сцену маршрута.
 */

module.exports = (ctx) => {
    const initStepScene = new Composer();

    const init = _(ctx.session.all_lists)
        .map((el, i) => {

            const filter = (ctx, next) => ctx.session.states.currentMenuState = 'init' && next()

            initStepScene.on('photo', async (ctx) => {
                try {
                    await postAttachments(ctx, ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id);
                } catch (error) {
                    await sendError(ctx, error)
                }

            });

            initStepScene.on('text', filter, async (ctx) => {
                await ctx.deleteMessage()
                await sendProses(ctx, ctx.i18n.t('isNotAllowedAction_message'))
            })

            initStepScene.action('get_start', async (ctx) => {
                await ctx.deleteMessage();
                await sendMessageInitKeyboardInitStep(ctx);
                await ctx.scene.enter(
                    `${ctx.session.all_lists[i].scene_id}`
                );
            });

            initStepScene.action('leaveScene', async (ctx) => {
                const ClickAPI = new Clickup(ctx.session.user.CU_Token);
                try {
                    await ClickAPI.TimeTracking.stopEntry(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id);
                    await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id, 'to do');

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

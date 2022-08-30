const { Composer } = require('telegraf');
_ = require('lodash');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageCarPhoto = require('../keyboards/scenes/divisionStepSceneKeyboards/sendMessageCarPhoto.routeMenu');
const setAssigneeFeature = require('../features/setAssignee.feature');
const { sendError } = require('../utils/sendLoadings');
const { resolveAllCheckListsAndItems } = require('../features/resolveCheckList.feature');
const Clickup = require('../api');
const sendMessageInitKeyboardInitStep = require('../keyboards/scenes/initStepSceneKeyboards/sendMessageInitKeyboard.initStep');

/**
 * Сцена распределения роутов.
 *
 * Запуск таймера главного чек/листа, получение его id
 */

module.exports = (ctx) => {
  const divisionStep = new Composer();

  const division = _(ctx.session.all_lists).map((el, i) => {

    divisionStep.action(`openRoute${i}`, async (ctx) => {

      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      try {
        await ctx.deleteMessage();

        await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id, 'in progress');
        await setAssigneeFeature(ctx.session.userName, ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id, ctx.session.user.CU_Token);
        await ClickAPI.TimeTracking.startEntry(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id);
        await sendMessageCarPhoto(ctx)

        return await ctx.wizard.selectStep(ctx.session.currentRouteNumber + ctx.session.all_lists.length);
      } catch (e) {
        console.log(e);
        await sendError(ctx, e);
      }
    });

    divisionStep.action('closeRoute', async (ctx) => {
      const ClickAPI = new Clickup(ctx.session.user.CU_Token);
      try {
        await ctx.deleteMessage();
        await sendMessageDriverMenu(ctx);

        await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id, 'done');
        await resolveAllCheckListsAndItems(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].checklists, 'true', ctx.session.user.CU_Token);
        await ClickAPI.TimeTracking.stopEntry(ctx.session.all_lists[ctx.session.currentRouteNumber].mainTask[0].id);

        await ctx.scene.leave();
      } catch (e) {
        await sendError(ctx, e);
      }
    });

    divisionStep.action('leaveScene', async (ctx) => {
      try {
        await ctx.deleteMessage();
        await sendMessageDriverMenu(ctx);
        ctx.session.currentRouteNumber = null;
        await ctx.scene.leave();
      } catch (e) {
        await sendError(ctx, e);
        await ctx.scene.leave();
      }
    });
    return divisionStep;
  });

  return division;
};

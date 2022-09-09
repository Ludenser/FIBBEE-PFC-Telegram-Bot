const { Composer } = require("telegraf");
const Clickup = require("../../../api");
const setAssigneeFeature = require("../../../features/setAssignee.feature");
const sendMessageDriverMenu = require("../../../keyboards/mainMenu/sendMessageDriverMenu");
const sendMessageCarPhotoRouteMenu = require("../../../keyboards/scenes/divisionStepSceneKeyboards/sendMessageCarPhoto.routeMenu");
const { sendError } = require("../../../utils/sendLoadings");

const OPENROUTE = 'openRoute'

module.exports = (ctx) => {
  const composer = new Composer();

  const divisionStepActions = _(ctx.session.all_lists).map((el, i) => {

    composer.action(OPENROUTE + i, async (ctx) => {

      try {
        const ClickAPI = new Clickup(ctx.session.user.CU_Token);
        await ctx.deleteMessage();
        ctx.session.states.currentMenuState = 'init_scene'

        await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id, 'in progress');
        await setAssigneeFeature(ctx.session.userName, ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id, ctx.session.user.CU_Token);
        await ClickAPI.TimeTracking.startEntry(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id);

        await sendMessageCarPhotoRouteMenu(ctx)
        await ctx.wizard.next()
        // return await ctx.wizard.selectStep(ctx.session.currentRouteNumber + 1);
      } catch (e) {
        console.log(e);
        await sendError(ctx, e);
        await sendMessageDriverMenu(ctx);
        ctx.session.currentRouteNumber = null;
        await ctx.scene.leave();
      }
    })

    return composer
  })

  return divisionStepActions
}
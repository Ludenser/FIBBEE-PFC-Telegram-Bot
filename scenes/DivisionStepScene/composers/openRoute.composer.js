const { Composer } = require("telegraf");
const Clickup = require("../../../api");
const setAssigneeFeature = require("../../../features/setAssignee.feature");
const sendMessageDriverMenu = require("../../MainMenu/keyboards/sendMessageDriverMenu.keyboard");
const sendMessageCarPhotoRouteMenu = require("../keyboards/sendMessageCarPhoto.keyboard");
const { menu_states } = require("../../../config/otherSettings");
const { sendError } = require("../../../utils/sendLoadings");
const { openRouteComposerActions: Actions } = require("../actions");

module.exports = (ctx) => {
  const composer = new Composer();

  const divisionStepActions = _(ctx.session.all_lists).map((el, i) => {

    composer.action(Actions.OPEN_ROUTE + i, async (ctx) => {

      try {
        const ClickAPI = new Clickup(ctx.session.user.CU_Token);
        await ctx.deleteMessage();
        ctx.session.states.currentMenuState = menu_states.INIT_SCENE

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
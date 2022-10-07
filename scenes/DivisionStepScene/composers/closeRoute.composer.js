const { Composer } = require("telegraf");
const {Clickup} = require("../../../api");
const sendMessageDriverMenu = require("../../MainMenu/keyboards/sendMessageDriverMenu.keyboard");
const { resolveAllCheckListsAndItems } = require('../../../features/resolveCheckList.feature')
const { sendError } = require("../../../utils/sendLoadings");
const { closeRouteComposerActions: Actions } = require("../actions");

const composer = new Composer()

composer.action(Actions.CLOSE_ROUTE, async (ctx) => {
  try {
    const ClickAPI = new Clickup(ctx.session.user.CU_Token);
    await ctx.deleteMessage();
    await sendMessageDriverMenu(ctx);

    await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id, 'done');
    await resolveAllCheckListsAndItems(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].checklists, 'true', ctx.session.user.CU_Token);
    await ClickAPI.TimeTracking.stopEntry(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id);

    await ctx.scene.leave();
  } catch (e) {
    await sendError(ctx, e);
  }
});


module.exports = composer
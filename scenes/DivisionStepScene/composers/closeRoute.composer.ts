import { SessionCtx } from '../../../global';
import { Composer } from "telegraf";
import { Clickup } from "../../../api";
import sendMessageDriverMenu from "../../MainMenu/keyboards/sendMessageDriverMenu.keyboard";
import { resolveAllCheckListsAndItems } from '../../../features/resolveCheckList.feature';
import { sendError } from "../../../utils/sendLoadings";
import { closeRouteComposerActions as Actions } from "../actions";

const composer = new Composer<SessionCtx>()

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

export default composer
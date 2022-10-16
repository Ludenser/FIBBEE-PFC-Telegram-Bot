import { SessionCtx } from '../../../global';
import _ from 'lodash';
import { Composer } from "telegraf";
import { Clickup } from "../../../api";
import setAssigneeFeature from "../../../features/setAssignee.feature";
import sendMessageDriverMenu from "../../MainMenu/keyboards/sendMessageDriverMenu.keyboard";
import sendMessageCarPhotoRouteMenu from "../keyboards/sendMessageCarPhoto.keyboard";
import { menu_states } from "../../../config/otherSettings";
import { sendError } from "../../../utils/sendLoadings";
import { openRouteComposerActions as Actions } from "../actions";

export default (ctx: SessionCtx) => {
  const composer = new Composer<SessionCtx>();

  const divisionStepActions = _(ctx.session.all_lists)
    .map((el, i) => {

      composer.action(Actions.OPEN_ROUTE + i, async (ctx) => {

        try {
          const ClickAPI = new Clickup(ctx.session.user.CU_Token);
          await ctx.deleteMessage();
          ctx.session.states.current.menu_state = menu_states.INIT_SCENE

          await ClickAPI.Tasks.setStatus(ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id, 'in progress');
          await setAssigneeFeature(ctx.session.user.id, ctx.session.all_lists[ctx.session.currentRouteNumber].driverTask[0].id, ctx.session.user.CU_Token);
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
    .value()

  return divisionStepActions
}
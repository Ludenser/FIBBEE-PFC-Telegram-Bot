const { Composer } = require("telegraf");
const sendMessageDriverMenu = require("../keyboards/mainMenu/sendMessageDriverMenu");
const { sendError } = require("../utils/sendLoadings");

module.exports = () => {
    const emptyStep = new Composer()


    emptyStep.action('leaveScene', async (ctx) => {
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
    return emptyStep;

};

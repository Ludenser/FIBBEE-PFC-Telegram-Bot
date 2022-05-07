module.exports = async (ctx, n) => {
    const currMsg = ctx.callbackQuery.message.message_id
    return await ctx.deleteMessage(currMsg - n)
}
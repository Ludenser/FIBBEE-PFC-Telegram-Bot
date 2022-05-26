/**
 * Удаление идущего перед последним сообщения.
 * 
 * n - число, указывающее сколько нужно отнять от id последнего сообщения.
 */
module.exports = async (ctx, n) => {

    let currMsg = ctx.update.message?.message_id
    if (currMsg == null) {
        currMsg = ctx.callbackQuery.message.message_id
    }

    return await ctx.deleteMessage(currMsg - n)
}
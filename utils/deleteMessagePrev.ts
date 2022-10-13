import { SessionCtx } from '../global'

/**
 * Удаление идущего перед последним сообщения.
 * @param {SessionCtx} ctx - объект контекста telegraf
 * @param {number} n - число, указывающее сколько нужно отнять от id последнего сообщения.
 */
export default async (ctx: SessionCtx, n: number) => {
    let currMsg: number = null
    if ('message' in ctx.update) {
        currMsg = ctx.update.message.message_id
    }
    if (currMsg == null) {
        currMsg = ctx.callbackQuery.message.message_id
    }

    return await ctx.deleteMessage(currMsg - n)
}
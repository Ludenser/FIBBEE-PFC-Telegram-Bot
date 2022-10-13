import { SessionCtx } from '../global';
import { sendError } from "./sendLoadings";

/**
 * Удаление сообщениий по их message_id.
 */
export default async (ctx: SessionCtx, message_ids: number[], isDeleted: boolean) => {
  try {
    message_ids.forEach(async el => {
      await ctx.deleteMessage(el);
    })
    isDeleted = true
    let reset: number[] = []

    return reset
  } catch (e) {
    await sendError(ctx, e)
    console.log(e)
  }
}
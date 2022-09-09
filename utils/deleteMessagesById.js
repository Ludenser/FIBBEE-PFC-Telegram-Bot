/**
 * Удаление сообщениий по их message_id.
 * @param {Ctx} ctx - объект контекста telegraf
 * @param {[Number]} message_ids - message_id из телеграмма
 */
module.exports = async (ctx, message_ids, isDeleted) => {

  message_ids.forEach(async el => {
    await ctx.deleteMessage(el);
  })
  isDeleted = true
  let reset = []

  return reset

}
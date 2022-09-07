/**
 * Удаление сообщениий по их message_id.
 * @param {Ctx} ctx - объект контекста telegraf
 * @param {[Number]} message_ids - message_id из телеграмма
 */
module.exports = async (ctx, message_ids) => {

  message_ids.forEach(async el => {
    await ctx.deleteMessage(el);
  })
  ctx.session.states.attention_msg_isDeleted = true
  let reset = []

  return reset

}
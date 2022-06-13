module.exports = {

  /**
    * Обработка ошибки и отправка сообщения об ошибке с последующим удалением сообщения об ошибке.
    */

  sendError: async function sendError(ctx, e) {
    await ctx.reply(`Ошибка! Сообщите об этом в чате supply-team, ${e}`)
      .then((result) => {
        setTimeout(() => {
          ctx.deleteMessage(result.message_id)
        }, 10 * 500)
      })
      .catch(e => console.log(e))
  },

  /**
    * Отправка сообщения с его последующим удалением.
    */

  sendProses: async function sendProses(ctx, str) {
    await ctx.reply(str)
      .then((result) => {
        setTimeout(() => {
          ctx.deleteMessage(result.message_id)
        }, 10 * 500)
      })
      .catch(e => console.log(e))
  },
  /**
    * Отправка сообщения о загрузке данных.
    */
  sendLoading: async function sendLoading(ctx) {
    let botReply = "Подожди, идет загрузка..."
    await ctx.reply(botReply)
      .then((result) => {
        setTimeout(() => {
          ctx.deleteMessage(result.message_id)
        }, 10 * 1000)
      })
      .catch(e => console.log(e))
  }

}
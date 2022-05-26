module.exports = {

  sendError: async function sendError(ctx, e) {
    ctx.reply(`Ошибка! Сообщите об этом в чате supply-team, ${e}`)
      .then((result) => {
        setTimeout(() => {
          ctx.deleteMessage(result.message_id)
        }, 10 * 500)
      })
      .catch(e => console.log(e))
  },

  sendProses: async function sendProses(ctx, str) {
    ctx.reply(str)
      .then((result) => {
        setTimeout(() => {
          ctx.deleteMessage(result.message_id)
        }, 10 * 500)
      })
      .catch(e => console.log(e))
  },

  sendLoading: function sendLoading(ctx) {
    let botReply = "Подождите, данные загружаются..."
    ctx.reply(botReply)
      .then((result) => {
        setTimeout(() => {
          ctx.reply(result.message_id)
        }, 10 * 1000)
      })
      .catch(e => console.log(e))
  }

}
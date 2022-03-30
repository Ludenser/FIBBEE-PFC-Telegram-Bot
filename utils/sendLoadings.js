module.exports = {

  sendSearch: function sendSearch(ctx) {
    let botReply = "Подождите, идет поиск..."
    ctx.reply(botReply)
      .then((result) => {
        setTimeout(() => {
          ctx.reply(result.message_id)
        }, 10 * 250)
      })
      .catch(e => console.log(e))
  },

  sendProses: function sendProses(ctx) {
    let botReply = "Подождите, в процессе"
    ctx.reply(botReply)
      .then((result) => {
        setTimeout(() => {
          ctx.reply(result.message_id)
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
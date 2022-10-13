
module.exports = async (ctx) => {
    ctx.reply('⚠️ Не забудь вбить в ерп стаканы и проставить СГ молока и СГ сиропов, если поменял. ⚠️').then((msg)=> {
        ctx.session.states.attention_msg.id = msg.message_id
    })
}
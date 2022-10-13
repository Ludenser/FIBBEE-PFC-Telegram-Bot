import { SessionCtx } from '../../../global'

export default async (ctx: SessionCtx) => {
    ctx.reply('⚠️ Не забудь вбить в ерп стаканы и проставить СГ молока и СГ сиропов, если поменял. ⚠️').then((msg) => {
        ctx.session.states.attention_msg.id.push(msg.message_id)
    })
}
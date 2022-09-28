const _ = require('lodash');
const Clickup = require('../api');
const supplyTeam_ids = require('../config/supplyTeam_ids');
const userModel = require('../db/models');
const { sendProses } = require('../utils/sendLoadings');
/**
  * Функция для поиска telegram username текущего пользователя в списке зарегистрированных пользователей из файла config/supplyTeam_ids
  * @param {Ctx} ctx - объект контекста telegraf
  */
module.exports = async (ctx) => {
    try {
        const userIdMatch = _(supplyTeam_ids)
            .find(['username', ctx.session.userName])
        ctx.session.user = userIdMatch

        if (ctx.session.user) {
            if (ctx.startPayload) {
                const code = ctx.startPayload
                const token = await new Clickup().Token.getToken(code)
                ctx.session.user.CU_Token = token.access_token
                const clickUpUser = await new Clickup(ctx.session.user.CU_Token).Users.getUser_ByToken()
                ctx.session.clickUpUser = clickUpUser.data.user
                await userModel.create({
                    tg_username: `${ctx.update.message.from.first_name} ${ctx.update.message.from.last_name}`,
                    clickup_user_id: ctx.session.clickUpUser.id,
                    clickup_username: ctx.session.clickUpUser.username,
                    clickup_token: ctx.session.user.CU_Token
                })
                ctx.session.isAuthUser = true
            }
        }
    } catch (e) {
        await sendProses(ctx, 'Такая запись уже есть')
    }

}
import { SessionCtx } from '../global';
import _ from 'lodash';
import { Clickup } from '../api';
import { userModel } from '../db/index';
import { sendProses } from '../utils/sendLoadings';
/**
  * Функция для поиска telegram username текущего пользователя в списке зарегистрированных 
  * пользователей из файла config/supplyTeam_ids
  */
export default async (ctx: SessionCtx) => {
    try {
        if (ctx.startPayload) {
                const code = ctx.startPayload
                const token = await new Clickup().Token.getToken(code)
                ctx.session.user.CU_Token = token.access_token
                const clickUpUser = await new Clickup(ctx.session.user.CU_Token).Users.getUser_ByToken()
                ctx.session.clickUpUser = clickUpUser.data.user
                await userModel.create({
                    tg_username: `${ctx.message.from.first_name} ${ctx.message.from.last_name}`,
                    clickup_user_id: ctx.session.clickUpUser.id,
                    clickup_username: ctx.session.clickUpUser.username,
                    clickup_token: ctx.session.user.CU_Token
                })
                ctx.session.isAuthUser = true
        }
        
    } catch (e) {
        await sendProses(ctx, 'Такая запись уже есть')
    }

}
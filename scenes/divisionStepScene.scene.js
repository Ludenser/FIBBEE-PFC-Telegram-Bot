const { Composer } = require('telegraf');
const { getMessageRouteFromClickAPI } = require('../features/getRoute.feature');
const { Task, Time } = require('../api/clickUpApi.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhoto = require('../keyboards/scenes/sendMessageUazPhoto.routeMenu');
const fs = require('fs');
const setAssigneeFeature = require('../features/setAssignee.feature');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const { sendError } = require('../utils/sendLoadings')
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning
} = setting;

/**
  * Сцена распределения роутов.
  * 
  * Запуск таймера главного чек/листа, получение его id
  */

module.exports = (ctx) => {
    const divisionStep = new Composer()

    const division = ctx.session.all_lists.map((el, i) => {

        divisionStep.action(`openRoute${i + 1}`, async (ctx) => {

            try {

                await ctx.deleteMessage()
                await getMessageRouteFromClickAPI(ctx, [ctx.session.all_lists[i].allTasks])

                await Task.setStatus(ctx.session.all_lists[i].mainTask, 'in progress')
                await setAssigneeFeature(ctx.session.all_lists[i].mainTask)
                const response = await Time.startEntry(ctx.session.team_id, ctx.session.all_lists[i].mainTask)
                // ctx.main_timer_id = response.data.data.id

                await sendMessageUazPhoto(ctx)
                return await ctx.wizard.next();

            } catch (e) {
                console.log(e)
                await sendError(ctx, e)
            }

        })

        divisionStep.action('closeRoute', async (ctx) => {
            try {
                await ctx.deleteMessage()
                await sendMessageDriverMenu(ctx)

                await Task.setStatus(ctx.session.all_lists[i].mainTask, 'done')
                await Time.startEntry(ctx.session.team_id, ctx.session.all_lists[i].mainTask)

                await ctx.scene.leave();
            } catch (e) {
                await sendError(ctx, e)
            }
        })
        return divisionStep
    })

    return division

}
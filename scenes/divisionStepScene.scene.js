const { Composer } = require('telegraf');
_ = require('lodash');
const { getMessageFromCurrentList } = require('../features/getRoute.feature');
const { Task, Time } = require('../api/clickUpApi.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhoto = require('../keyboards/scenes/sendMessageUazPhoto.routeMenu');
const setAssigneeFeature = require('../features/setAssignee.feature');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const { sendError } = require('../utils/sendLoadings')


/**
  * Сцена распределения роутов.
  * 
  * Запуск таймера главного чек/листа, получение его id
  */

module.exports = (ctx) => {

    const divisionStep = new Composer()

    const division = _(ctx.session.all_lists)
        .map((el, i) => {

            divisionStep.action(`openRoute${i}`, async (ctx) => {

                try {

                    await ctx.deleteMessage()
                    await getMessageFromCurrentList(ctx, ctx.session.all_lists[i].tasksWithoutMain)

                    // await Task.setStatus(ctx.session.all_lists[i].mainTask[0].id, 'in progress')
                    // await setAssigneeFeature(ctx.session.all_lists[i].mainTask[0].id)
                    // const response = await Time.startEntry(ctx.session.team_id, ctx.session.all_lists[i].mainTask[0].id)
                    // ctx.main_timer_id = response.data.data.id

                    await sendMessageUazPhoto(ctx)
                    return await ctx.wizard.selectStep(i + ctx.session.all_lists.length);

                } catch (e) {
                    console.log(e)
                    await sendError(ctx, e)
                }

            })

            divisionStep.action('closeRoute', async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    await sendMessageDriverMenu(ctx)

                    // await Task.setStatus(ctx.session.all_lists[i].mainTask[0].id, 'done')
                    // await Time.startEntry(ctx.session.team_id, ctx.session.all_lists[i].mainTask[0].id)

                    await ctx.scene.leave();
                } catch (e) {
                    await sendError(ctx, e)
                }
            })

            divisionStep.action('leaveScene', async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    await sendMessageDriverMenu(ctx)
                    await ctx.scene.leave()
                } catch (e) {
                    await sendError(ctx, e)
                    await ctx.scene.leave()
                }
            })
            return divisionStep
        })

    return division

}
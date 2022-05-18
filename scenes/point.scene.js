const { Composer, Scenes } = require('telegraf'),
    GetTasksService = require('../api/clickupApiTasks.service'),
    GetTimeService = require('../api/clickupApiTime.service'),
    sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu'),
    sendMessageUazPhotoCheck = require('../keyboards/scenes/sendMessageUazPhotoCheck.routeMenu'),
    deleteMessagePrev = require('../utils/deleteMessagePrev');




module.exports = (arr) => {
    const newArr = arr.reverse().map((task) => {
        const point_scene = new Composer()


        point_scene.on('message', async (ctx) => {
            await ctx.deleteMessage()
            // await sendMessageUazPhotoCheck(ctx)
            await ctx.reply(task.name)
            console.log(task, task.id)
            await ctx.wizard.next()
        })

        point_scene.action('point_1', async (ctx) => {
            await ctx.deleteMessage()

            console.log(task, task.id)
            await ctx.wizard.next()
        })

        point_scene.action('leaveScene', async (ctx) => {

            await ctx.deleteMessage()
            await deleteMessagePrev(ctx, 1)
            await sendMessageDriverMenu(ctx)
            await ctx.scene.leave()
        })
        return point_scene
    })
    return newArr
}
// point_scene.action('openRoute1', async (ctx) => {
        //     await sendMessageUazPhotoCheck(ctx)
        //     console.log(value)
        // })

        // point_scene.action('openRoute2', async (ctx) => {
        //     await sendMessageUazPhotoCheck(ctx)
        //     console.log(value)
        // })

            // await deleteMessagePrev(ctx, 3)
            // await deleteMessagePrev(ctx, 2)
            // await deleteMessagePrev(ctx, 1)
            // await GetTimeService.stopTimeEntry(24409308)
            // await GetTasksService.setTaskStatus(value, 'to do')
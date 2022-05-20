const { Composer, Scenes } = require('telegraf');
const GetTasksService = require('../api/clickupApiTasks.service');
const GetTimeService = require('../api/clickupApiTime.service');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessageUazPhotoCheck = require('../keyboards/scenes/sendMessageUazPhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');




module.exports = (arr) => {
    const newArr = arr.reverse().map((task, i) => {

        if (task.name.includes('Обслуживание')) {
            const point_scene = new Composer()

            if (arr.length != i) {
                point_scene.on('message', async (ctx) => {
                    await ctx.deleteMessage()
                    // await sendMessageUazPhotoCheck(ctx)
                    await ctx.reply(task.name)
                    console.log(task, task.id)
                    await ctx.wizard.next()
                })
            } else {
                point_scene.on('message', async (ctx) => {
                    await ctx.deleteMessage()
                    // await sendMessageUazPhotoCheck(ctx)
                    await ctx.reply(task.name)
                    console.log(task, i)

                })
            }


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
        }
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
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
                point_scene.hears('Дальше', async (ctx) => {
                    await ctx.deleteMessage()
                    // await sendMessageUazPhotoCheck(ctx)
                    await ctx.reply('Прикрепи фото если нужно',
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: 'Назад!↩️', callback_data: 'leaveScene' }
                                    ]
                                ]
                            },
                            reply_markup: {
                                keyboard: [
                                    [{ text: 'Дальше' }]
                                ],
                                one_time_keyboard: true,
                                resize_keyboard: true
                            },
                            parse_mode: "Markdown"
                        })
                    console.log(task.name, task.id)
                    await ctx.wizard.next()
                    await ctx.reply(task.name)
                })
            } else {
                point_scene.hears('Дальше', async (ctx) => {
                    await ctx.deleteMessage()
                    // await sendMessageUazPhotoCheck(ctx)
                    await ctx.reply(task.name)
                    await ctx.reply('Прикрепи фото если нужно',
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: 'Назад!↩️', callback_data: 'leaveScene' }
                                    ]
                                ]
                            },
                            reply_markup: {
                                keyboard: [
                                    [{ text: 'Дальше' }]
                                ],
                                one_time_keyboard: true,
                                resize_keyboard: true
                            },
                            parse_mode: "Markdown"
                        })
                    console.log('FFFFFFFFFFFFFFFFAFASFASFASF', task.name, task.id)

                })
            }

            point_scene.action('enter', async (ctx) => {
                await ctx.deleteMessage()
                await ctx.reply(`${task.name}`)
                await ctx.reply('Прикрепи фото если нужно',
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Назад!↩️', callback_data: 'leaveScene' }
                                ]
                            ]
                        },
                        reply_markup: {
                            keyboard: [
                                [{ text: 'Дальше' }]
                            ],
                            one_time_keyboard: true,
                            resize_keyboard: true
                        },
                        parse_mode: "Markdown"
                    })
                console.log(task.name, task.id)
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
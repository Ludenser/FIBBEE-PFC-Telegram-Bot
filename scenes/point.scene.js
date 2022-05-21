const { Composer, Markup } = require('telegraf');
const GetTasksService = require('../api/clickupApiTasks.service');
const GetTimeService = require('../api/clickupApiTime.service');
const PostAttachmentsService = require('../api/clickupApiAttachments.service')
const postAttachmentsFeature = require('../features/postAttachments.feature');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessagePhotoCheck = require('../keyboards/scenes/sendMessagePhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const sendMessageError = require('../utils/sendMessageError');

module.exports = (arr) => {
    const newArr = arr.reverse().map((task, i) => {

        if (task.name.includes('Обслуживание')) {

            const point_scene = new Composer()

            point_scene.action('enter', async (ctx) => {
                await ctx.deleteMessage()
                // try {
                //     await GetTasksService.setTaskStatus(task.id, 'in progress')
                //     await GetTimeService.startTimeEntry(ctx.team_id, task.id)
                // } catch (e) {
                //     await sendMessageError(ctx, e)
                // }

                await ctx.reply(task.name,
                    Markup.inlineKeyboard(
                        [
                            Markup.button.callback('Загрузить фото', 'upl_photo'),
                            Markup.button.callback('Оставить комментарий', 'upl_comment'),
                            Markup.button.callback('Закончить обслуживание', 'next_step'),
                            Markup.button.callback('Выйти', 'leaveScene')
                        ], {
                        wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
                    })
                )
                console.log(task.name, task.id)
            })

            point_scene.hears('Подтвердить загрузку фото✅', async (ctx) => {
                await ctx.deleteMessage()
                await sendMessagePhotoCheck('point', ctx)
            })

            point_scene.action('upl_photo', async (ctx) => {
                await ctx.deleteMessage()
                await ctx.reply('Прикрепи и отправь фотки',
                    Markup.keyboard([
                        Markup.button.callback('Подтвердить загрузку фото✅')
                    ]).resize(true).oneTime(true)
                )
                await ctx.reply(task.name,
                    Markup
                        .inlineKeyboard([
                            Markup.button.callback('Вернуться в меню осблуживания комплекса', 'enter'),
                        ]))
                point_scene.on('photo', async (ctx) => {
                    await postAttachmentsFeature(ctx, task.id)
                })
            })

            point_scene.action('upl_comment', async (ctx) => {
                await ctx.reply('Напиши комментарий к таску, если нужно кого-то тегнуть, добавь @nickname')
                point_scene.on('message', async (ctx) => {
                    await PostAttachmentsService.createCommentAttachment(ctx, task.id)
                    await ctx.deleteMessage()
                })

                console.log(task.name, task.id)
            })

            point_scene.action('next_step', async (ctx) => {
                await ctx.deleteMessage()
                await ctx.reply(`Заканчиваем ${task.name}`, Markup
                    .inlineKeyboard([
                        Markup.button.callback('Едем дальше', 'enter'),
                    ]))
                await ctx.wizard.next()
            })

            point_scene.action('leaveScene', async (ctx) => {
                try {
                    // await GetTimeService.stopTimeEntry(ctx.team_id, task.id)
                    // await GetTasksService.setTaskStatus(task.id, 'to do')
                    await ctx.deleteMessage()
                    await deleteMessagePrev(ctx, 2)
                    await sendMessageDriverMenu(ctx)
                    await ctx.scene.leave()
                } catch (e) {
                    await sendMessageError(ctx, e)
                    await sendMessageDriverMenu(ctx)
                    await ctx.scene.leave()
                }

            })
            return point_scene
        }
    }
    )
    return newArr

}
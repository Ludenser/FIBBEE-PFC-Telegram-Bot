const { Composer, Markup } = require('telegraf');
const { Task, Time, Users } = require('../api/clickUpApi.service');
const postAttachmentsFeature = require('../features/postAttachments.feature');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessagePhotoCheck = require('../keyboards/scenes/sendMessagePhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const sendMessageError = require('../utils/sendMessageError');
const postCommentFeature = require('../features/postComment.feature');
const setAssigneeFeature = require('../features/setAssignee.feature');

module.exports = (arr) => {
    const newArr = arr.reverse().map((task, i) => {

        if (task.name.includes('Обслуживание')) {

            const point_scene = new Composer()

            point_scene.action('enter', async (ctx) => {
                try {
                    await Task.setStatus(task.id, 'in progress')
                    await setAssigneeFeature(task.id)
                    await Time.startEntry(ctx.team_id, task.id)
                } catch (e) {
                    await sendMessageError(ctx, e)
                }
                await ctx.deleteMessage()
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

            point_scene.action('enter_more', async (ctx) => {
                await ctx.deleteMessage()
                await deleteMessagePrev(ctx, 1)
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
                await ctx.reply(`Прикрепляем фото к таску ${task.name}`,
                    Markup
                        .inlineKeyboard([
                            Markup.button.callback('Вернуться в меню осблуживания комплекса', 'enter_more'),
                        ]))
                point_scene.on('photo', async (ctx) => {
                    await postAttachmentsFeature(ctx, task.id)
                })
            })

            point_scene.action('upl_comment', async (ctx) => {
                await ctx.reply('Напиши комментарий к таску, если нужно кого-то тегнуть, добавь в конце комментария "@имя фамилия"',
                    Markup
                        .inlineKeyboard([
                            Markup.button.callback('Вернуться в меню осблуживания комплекса', 'enter_more'),
                        ]))
                point_scene.on('message', async (ctx) => {
                    await postCommentFeature(ctx, task.id)
                    await ctx.deleteMessage()
                })

                console.log(task.name, task.id)
            })

            point_scene.action('next_step', async (ctx) => {
                try {
                    await Task.setStatus(task.id, 'done')
                    await Time.stopEntry(ctx.team_id, task.id)
                } catch (e) {
                    await sendMessageError(ctx, e)
                }

                await ctx.deleteMessage()
                await ctx.reply(`Заканчиваем ${task.name}`, Markup
                    .inlineKeyboard([
                        Markup.button.callback('Едем дальше', 'enter'),
                    ]))
                await ctx.wizard.next()
            })

            point_scene.action('leaveScene', async (ctx) => {
                try {
                    // await Time.stopEntry(ctx.team_id, task.id)
                    // await Task.setStatus(task.id, 'to do')
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
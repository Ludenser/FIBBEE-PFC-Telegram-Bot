const { Composer, Markup } = require('telegraf');
const _ = require('lodash');
const { Task, Time } = require('../api/clickUpApi.service');
const postAttachmentsFeature = require('../features/postAttachments.feature');
const sendMessageDriverMenu = require('../keyboards/mainMenu/sendMessageDriverMenu');
const sendMessagePhotoCheck = require('../keyboards/scenes/sendMessagePhotoCheck.routeMenu');
const deleteMessagePrev = require('../utils/deleteMessagePrev');
const postCommentFeature = require('../features/postComment.feature');
const setAssigneeFeature = require('../features/setAssignee.feature');
const sendMessageRouteEnter = require('../keyboards/scenes/sendMessageRouteEnter');
const sendMessageRouteEnterEx = require('../keyboards/scenes/sendMessageRouteEnterEx');
const { sendError } = require('../utils/sendLoadings');
const { resolveAllCheckListsAndItems } = require('../features/resolveCheckList.feature');
/**
  * Универсальная сцена обслуживания комплекса.
  * Динамически создается на основании массива тасков из API
  */
module.exports = (arr, list) => {

    const complexSceneArray = _(arr)
        .map((task) => {

            const complex_scene = new Composer()

            complex_scene.action('enter', async (ctx) => {
                try {
                    await ctx.deleteMessage()

                    await Task.setStatus(task.id, 'in progress')
                    await Time.startEntry(ctx.session.team_id, task.id)

                    await setAssigneeFeature(ctx.session.userName, task.id)
                    await sendMessageRouteEnter(ctx, task.name, task.id)


                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                }
            })

            complex_scene.action('reenter', async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                }

            })

            complex_scene.hears('Подтвердить загрузку фото✅', async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    await deleteMessagePrev(ctx, 1)
                    await sendMessagePhotoCheck('complex', ctx)
                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                }

            })

            complex_scene.action('upl_photo', async (ctx) => {

                try {
                    await ctx.deleteMessage()
                    await ctx.reply('Прикрепи и отправь фотки',
                        Markup.keyboard([
                            Markup.button.callback('Подтвердить загрузку фото✅')
                        ]).resize(true).oneTime(true)
                    )
                    complex_scene.on('photo', async (ctx) => {
                        await postAttachmentsFeature(ctx, task.id)
                    })
                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                }
            })

            complex_scene.action('upl_comment', async (ctx) => {
                try {
                    await ctx.deleteMessage()
                    await ctx.reply('Напиши комментарий к таску, если нужно кого-то тегнуть, добавь в конце комментария "@имя фамилия"',

                        Markup
                            .inlineKeyboard([
                                Markup.button.callback('Вернуться в меню осблуживания комплекса', 'reenter'),
                            ]))

                    complex_scene.on('text', async (ctx) => {
                        if (ctx.update.message.text !== undefined) {
                            await ctx.deleteMessage()
                            await postCommentFeature(ctx, task.id)
                        } else {
                            console.log('Опять')
                        }
                    })

                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                }
            })

            complex_scene.action('next_step', async (ctx) => {
                try {

                    await Task.setStatus(task.id, 'done')
                    await Time.stopEntry(ctx.session.team_id, task.id)
                    await resolveAllCheckListsAndItems(task.checklists, 'true')

                    await ctx.deleteMessage()
                    await ctx.reply(`Заканчиваем ${task.name}`, Markup
                        .inlineKeyboard([
                            Markup.button.callback('Едем дальше', 'enter'),
                        ]))
                    await ctx.wizard.next()
                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnter(ctx, task.name, task.id)
                }
            })

            complex_scene.action('exit', async (ctx) => {
                try {

                    await Task.setStatus(task.id, 'done')
                    await Time.stopEntry(ctx.session.team_id, task.id)
                    await Time.startEntry(ctx.session.team_id, list.mainTask[0].id)
                    await resolveAllCheckListsAndItems(task.checklists, 'true')

                    await ctx.deleteMessage()
                    await sendMessageRouteEnterEx(ctx)
                    await ctx.scene.enter('INITIAL_WIZARD_ID')
                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageRouteEnterEx(ctx)
                    await ctx.scene.enter('INITIAL_WIZARD_ID')
                }

            })

            complex_scene.action('leaveScene', async (ctx) => {
                try {

                    await Time.stopEntry(ctx.session.team_id, task.id)
                    await Task.setStatus(task.id, 'to do')
                    await Task.setStatus(list.mainTask[0].id, 'to do')
                    await resolveAllCheckListsAndItems(task.checklists, 'false')
                    await resolveAllCheckListsAndItems(list.mainTask[0].checklists, 'false')

                    await ctx.deleteMessage()
                    ctx.session.currentRouteNumber = null
                    await sendMessageDriverMenu(ctx)
                    await ctx.scene.leave()
                } catch (e) {
                    await sendError(ctx, e)
                    await sendMessageDriverMenu(ctx)
                    await ctx.scene.leave()
                }

            })

            return complex_scene
        })

    return complexSceneArray
}
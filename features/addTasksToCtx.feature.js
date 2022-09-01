
const _ = require('lodash')
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const { team_id } = setting;
const chalk = require('chalk')
const simulation = require('../lib/simulation');
const list_ids = require('../lib/list_idsFromClickUp');
const Clickup = require('../api');
const { sendError } = require('../utils/sendLoadings');

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */

module.exports = async (ctx) => {

    try {
        const all_tasks_any_status = await new Clickup(ctx.session.user.CU_Token).Tasks.getTodayTasksWithAnyStatus(list_ids)

        let driverTask = _(all_tasks_any_status.data.tasks)
            .reverse()
            .filter(item => item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => (value[0].status.status.includes('in progress') ? { list_id: key, driverTask: value, isOpened: true, } : { list_id: key, driverTask: value }))
            .value();

        let allTasks = _(all_tasks_any_status.data.tasks)
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, allTasks: value, }))
            .value();

        let tasksWithoutDriverTask = _(all_tasks_any_status.data.tasks)
            .filter(item => !item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, tasksWithoutDriverTask: value, }))
            .value();

        let all_lists = allTasks.map((element, index) => {
            return Object.assign({}, allTasks[index], driverTask[index], tasksWithoutDriverTask[index])
        })

        ctx.session.all_lists = all_lists
        ctx.session.team_id = team_id
        ctx.session.isAlreadyFilled = true
        ctx.session.states = {}
        ctx.session.states.attention_msg_id = []
        ctx.session.states.currentMenuState = ''
        ctx.session.states.isCommentMenu = false
        ctx.session.states.isPhotoMenu = false
        ctx.session.states.isCFMenu = false

    } catch (error) {
        await sendError(ctx, error)
    }

}
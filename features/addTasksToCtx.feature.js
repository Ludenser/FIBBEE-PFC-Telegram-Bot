
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

        let allTasksWithoutSide = _(all_tasks_any_status.data.tasks)
            .filter(item => item.name.includes('Обслуживание') || item.name.includes('водителя') || item.name.includes('Пополнение'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, allTasksWithoutSide: value, }))
            .value();

        let tasksWithoutDriverTaskAndSide = _(all_tasks_any_status.data.tasks)
            .reject(item => {
                for (let elem of item.tags) {
                    return elem.name === 'test'
                }
            })
            .filter(item => !item.name.includes('водителя'))
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, tasksWithoutDriverTaskAndSide: value, lastTask: _.last(value).id }))
            .value();

        let sideTasks = _(all_tasks_any_status.data.tasks)
            .filter(item => {
                for (let elem of item.tags) {
                    return elem.name === 'test'
                }
            })
            .groupBy(item => item.list.id)
            .map((value, key) => ({ list_id: key, sideTasks: value, }))
            .value();


        let all_lists = allTasksWithoutSide.map((element, index) => {
            return Object.assign(
                {},
                sideTasks[index],
                allTasksWithoutSide[index],
                driverTask[index],
                tasksWithoutDriverTaskAndSide[index],


            )
        })
        console.log(all_lists);

        ctx.session.all_lists = all_lists
        ctx.session.team_id = team_id
        ctx.session.isAlreadyFilled = true
        ctx.session.states = {}
        ctx.session.states.isTaskLast = false
        ctx.session.states.attention_msg_id = []
        ctx.session.states.attention_msg_isDeleted = false
        ctx.session.states.currentLocationName = ''
        ctx.session.states.currentMenuState = ''
        ctx.session.states.currentList_id = ''
        ctx.session.states.currentTask_id = ''
        ctx.session.states.currentSideTaskId = ''

    } catch (error) {
        await sendError(ctx, error)
    }

}
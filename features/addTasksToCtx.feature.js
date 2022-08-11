
const { Task } = require('../api/clickUpApi.service');
const _ = require('lodash')
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const { team_id } = setting;
const chalk = require('chalk')
const simulation = require('../lib/simulation');
const list_ids = require('../lib/list_idsFromClickUp');
const supplyTeam_ids = require('../lib/supplyTeam_ids');

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */

module.exports = async (ctx) => {

    const all_tasks_any_status = await Task.getTodayTasksWithAnyStatus(list_ids)

    let resultMain = _(all_tasks_any_status.data.tasks)
        .reverse()
        .filter(item => item.name.includes('водителя'))
        .groupBy(item => item.list.id)
        .map((value, key) => ({ list_id: key, mainTask: value }))
        .value();

    let result = _(all_tasks_any_status.data.tasks)
        .groupBy(item => item.list.id)
        .map((value, key) => ({ list_id: key, allTasks: value, }))
        .value();

    let resultWithoutMain = _(all_tasks_any_status.data.tasks)
        .filter(item => !item.name.includes('водителя'))
        .groupBy(item => item.list.id)
        .map((value, key) => ({ list_id: key, tasksWithoutMain: value, }))
        .value();

    let all_result = result.map((element, index) => {
        return Object.assign({}, result[index], resultMain[index], resultWithoutMain[index])
    })

    const userIdMatch = _(supplyTeam_ids)
        .find(['username', ctx.session.userName])

    ctx.session.CU_Token = userIdMatch.CU_Token
    ctx.session.all_lists = all_result
    ctx.session.team_id = team_id
    ctx.session.isAlreadyFilled = true
    ctx.session.photoCounter = 0
}
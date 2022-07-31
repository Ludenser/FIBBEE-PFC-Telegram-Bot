
const { Task } = require('../api/clickUpApi.service');
const _ = require('lodash')
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning,
    team_id
} = setting;
const chalk = require('chalk')
const simulation = require('../lib/simulation');
const list_ids = require('../lib/list_idsFromClickUp')

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */
module.exports = async (ctx) => {

    const all_tasksSupply = await Task.getTodayTasksWithStatusTodo(listIdSupply)
    const all_tasksClean = await Task.getTodayTasksWithStatusTodo(listIdCleaning)

    const all_tasks = await Task.getTodayTasksWithStatusTodoFromTeamId(list_ids)

    let resultMain = _(all_tasks.data.tasks)
        .filter(item => item.name.includes('водителя'))
        .groupBy(item => item.list.id)
        .map((value, key) => ({ list_id: key, mainTask: value }))
        .value();

    let result = _(all_tasks.data.tasks)
        .groupBy(item => item.list.id)
        .map((value, key) => ({ list_id: key, allTasks: value, }))
        .value();

    let resultWithoutMain = _(all_tasks.data.tasks)
        .filter(item => !item.name.includes('водителя'))
        .groupBy(item => item.list.id)
        .map((value, key) => ({ list_id: key, tasksWithoutMain: value, }))
        .value();

    let all_result = result.map((element, index) => {
        return Object.assign({}, result[index], resultMain[index], resultWithoutMain[index])
    })

    console.log(all_result);

    ctx.session.all_lists = all_result
    ctx.session.team_id = team_id
    ctx.session.isAlreadyFilled = true
    ctx.all_tasksSupply = all_tasksSupply.data.tasks
    ctx.all_tasksClean = all_tasksClean.data.tasks

    ctx.all_tasksSupply.forEach((element, i) => {
        if (element.name.includes('водителя' || 'оператора')) {
            ctx.session.primeTasks = element.id
        }
    })

    ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    ctx.all_tasksClean.forEach((element, i) => {
        if (element.name.includes('водителя' || 'оператора')) {
            ctx.primeTaskClean_id = element.id
        }
    })

    ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    // if (!all_tasksSupply.data.tasks.length && all_tasksClean.data.tasks.length) {

    //     console.log(chalk.blueBright('Лист taskSupply пустой, а taskClean-нет, вместо taskSupply добавлена заглушка'))

    //     ctx.all_tasksSupply = simulation
    //     ctx.session.team_id = team_id
    //     ctx.all_tasksClean = all_tasksClean.data.tasks

    //     ctx.all_tasksSupply.forEach((element, i) => {
    //         if (element.id.includes('sim_Main')) {
    //             ctx.primeTaskSupply_id = element.id
    //             ctx.all_tasksSupply.splice(i, 1)
    //         }
    //     })

    //     ctx.all_tasksClean.forEach((element, i) => {
    //         if (element.name.includes('водителя' || 'оператора')) {
    //             ctx.primeTaskClean_id = element.id
    //         }
    //     })

    //     ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    // }
    // else if (!all_tasksClean.data.tasks.length && all_tasksSupply.data.tasks.length) {

    //     console.log(chalk.blueBright('Лист taskClean пустой, а taskSupply-нет, вместо taskClean добавлена заглушка '))

    //     ctx.all_tasksClean = simulation
    //     ctx.session.team_id = team_id

    //     ctx.all_tasksClean.forEach((element, i) => {
    //         if (element.id.includes('sim_Main')) {
    //             ctx.primeTaskClean_id = element.id
    //             ctx.all_tasksClean.splice(i, 1)
    //         }
    //     })
    //     ctx.all_tasksSupply.forEach((element, i) => {
    //         if (element.name.includes('водителя' || 'оператора')) {
    //             ctx.primeTaskSupply_id = element.id
    //         }
    //     })

    //     ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    // } else if (!all_tasksClean.data.tasks.length && !all_tasksSupply.data.tasks.length) {
    //     console.log(chalk.blueBright('Оба листа пусты, вместо них добавлена заглушка'))

    //     ctx.all_tasksSupply = simulation
    //     ctx.all_tasksClean = simulation
    //     ctx.session.team_id = team_id

    //     ctx.all_tasksSupply.forEach((element, i) => {
    //         if (element.id.includes('sim_Main')) {
    //             ctx.primeTaskSupply_id = element.id
    //             ctx.all_tasksSupply.splice(i, 1)
    //         }
    //     })
    //     ctx.all_tasksClean.forEach((element, i) => {
    //         if (element.id.includes('sim_Main')) {
    //             ctx.primeTaskClean_id = element.id
    //             ctx.all_tasksClean.splice(i, 1)
    //         }
    //     })

    // } else {
    //     ctx.all_tasksSupply = all_tasksSupply.data.tasks
    //     ctx.all_tasksClean = all_tasksClean.data.tasks
    //     ctx.session.team_id = team_id

    //     ctx.all_tasksSupply.forEach((element, i) => {
    //         if (element.name.includes('водителя' || 'оператора')) {
    //             ctx.primeTaskSupply_id = element.id
    //         }
    //     })

    //     ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    //     ctx.all_tasksClean.forEach((element, i) => {
    //         if (element.name.includes('водителя' || 'оператора')) {
    //             ctx.primeTaskClean_id = element.id
    //         }
    //     })

    //     ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    // }
}


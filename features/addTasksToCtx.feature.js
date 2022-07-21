
const { Task } = require('../api/clickUpApi.service');
const fs = require('fs');
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'));
const {
    listIdSupply,
    listIdCleaning,
    team_id
} = setting;
const chalk = require('chalk')
const simulation = require('../lib/simulation')

/**
  * Добавление в контекст объекта тасков из ClickUp.
  */
module.exports = async (ctx) => {

    const all_tasksSupply = await Task.getTodayTasksWithStatusTodo(listIdSupply)
    const all_tasksClean = await Task.getTodayTasksWithStatusTodo(listIdCleaning)

    if (!all_tasksSupply.data.tasks.length && all_tasksClean.data.tasks.length) {

        console.log(chalk.blueBright('Лист taskSupply пустой, а taskClean-нет, вместо taskSupply добавлена заглушка'))

        ctx.all_tasksSupply = simulation
        ctx.team_id = team_id
        ctx.all_tasksClean = all_tasksClean.data.tasks

        ctx.primeTaskClean_id = ctx.all_tasksClean.filter(element => element.id.includes('sim_Main'))
        ctx.primeTaskSupply_id = ctx.all_tasksSupply.filter(element => element.id.includes('водителя' || 'оператора'))

        ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    } else if (!all_tasksClean.data.tasks.length && all_tasksSupply.data.tasks.length) {

        console.log(chalk.blueBright('Лист taskClean пустой, а taskSupply-нет, вместо taskClean добавлена заглушка '))

        ctx.all_tasksClean = simulation
        ctx.team_id = team_id

        ctx.primeTaskClean_id = ctx.all_tasksClean.filter(element => element.id.includes('sim_Main'))
        ctx.primeTaskSupply_id = ctx.all_tasksSupply.filter(element => element.id.includes('водителя' || 'оператора'))

        ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    } else {
        ctx.all_tasksSupply = all_tasksSupply.data.tasks
        ctx.all_tasksClean = all_tasksClean.data.tasks
        ctx.team_id = team_id


        ctx.primeTaskSupply_id = ctx.all_tasksSupply.filter(element => element.id.includes('водителя' || 'оператора'))


        ctx.all_tasksSupply = ctx.all_tasksSupply.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

        ctx.primeTaskClean_id = ctx.all_tasksClean.filter(element => element.id.includes('водителя' || 'оператора'))

        ctx.all_tasksClean = ctx.all_tasksClean.filter(element => element.name.includes('Обслуживание') || element.name.includes('Пополнение')).reverse()

    }
}


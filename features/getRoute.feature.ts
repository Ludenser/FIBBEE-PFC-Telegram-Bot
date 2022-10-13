
import _ from 'lodash';
import { Markup } from 'telegraf';
import toLocalTime from '../utils/toLocalTime';
import { Clickup } from '../api';
import { SessionCtx, Task, TasksWithoutDriverTaskAndSide } from '../global';

function formattedTaskString(value: TasksWithoutDriverTaskAndSide, index: number) {
  const timeStamp = toLocalTime(value)
  return `\n\n${index + 1}. ${value.name} c ${timeStamp.timeStart} до ${timeStamp.timeDue}`
}

function formattedTitleString(value: string[], index: number) {
  return `\n\n🔸<b>${index + 1} маршрут:</b>${value}`
}


/**
  * Отправка сообщения из списка тасков из всех тасклистов ClickUp в виде строк.
  */

export const sendFormatMsgFromAllClickUpLists = async (ctx: SessionCtx) => {

  const resArray = _(ctx.session.all_lists)
    .map((list) => {
      const nameValues = _(list.allTasksWithoutSide)
        .map((value, index) => { return formattedTaskString(value, index) })
        .value()
      return nameValues

    }).value()


  const msg = _(resArray)
    .map((value, index) => { return formattedTitleString(value, index) })

  ctx.replyWithHTML(msg.toString(),
    Markup.inlineKeyboard([
      Markup.button.callback(ctx.i18n.t('return_button'), 'modeChange')
    ]))
}

/**
    * Отправка сообщения из списка тасков, указанного в аргументе тасклиста ClickUp, в виде строк.
    */
export const sendFormatMsgFromCurrentClickUpList = async (ctx: SessionCtx, list: Task[]) => {

  const nameValues = _(list)

    .map((value, index) => { return formattedTaskString(value, index) })

  const reply = nameValues.join("\n")

  const msg = `🔸  <b>Маршрут:</b>\n${reply}`

  await ctx.replyWithHTML(msg).then(result => ctx.session.states.route_msg.id = [result.message_id])
}

/**
  * Получение списка id тасков из ClickUp
  */

export const getTaskIdArrFromApi = async (token: string, list_id: string) => {
  try {
    const response = await new Clickup(token).Tasks.getTodayTasksWithStatusTodo(list_id)
    const newArr = response.data.tasks.reverse().map(value => {
      return value.id
    })
    return newArr
  } catch (e) {
    console.log(e)
  }
}

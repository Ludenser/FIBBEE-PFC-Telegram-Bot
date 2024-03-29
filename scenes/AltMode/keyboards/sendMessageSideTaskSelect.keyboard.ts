import { SessionCtx, Task } from '../../../global'
import { Markup } from 'telegraf'
import { enterComposerActions as shared_Actions } from "../actions";

/**
    * Клавиатура меню выбора доп.задачи
    * @param {SessionCtx} ctx - объект контекста telegraf
    * @param {Task[]} sideTasks - объект текущей доп.задачи
    */
export default async (ctx: SessionCtx, sideTasks: Task[]) => {

  function sideTasksSelectKeyboard() {

    let buttonsArray = []

    for (const sideTask of sideTasks) {
      buttonsArray.push(Markup.button.callback(
        sideTask.name,
        sideTask.id
      ))
    }

    buttonsArray.push(Markup.button.callback(
      ctx.i18n.t('return_button'),
      `${shared_Actions.REENTER}${ctx.session.states.current.task.id}`
    ))
    return buttonsArray
  }

  await ctx.reply(
    ctx.i18n.t('mainComplex_scene_keyBoard_sideTaskMenu_header'),
    Markup.inlineKeyboard(
      [
        ...sideTasksSelectKeyboard()
      ], {
      columns: 2,
      wrap: (btn, index, currentRow) => index != currentRow.length - 1
    }
    )
  )
}
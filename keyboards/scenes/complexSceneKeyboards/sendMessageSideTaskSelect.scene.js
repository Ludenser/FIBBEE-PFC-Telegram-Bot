const { Markup } = require('telegraf')
/**
    * Клавиатура меню выбора доп.задачи
    * @param {Сtx} ctx - объект контекста telegraf
    * @param {Object} current_list - объект текущего таск листа
    */
module.exports = async (ctx, current_list) => {

  function sideTasksSelectKeyboard() {

    let buttonsArray = []

    for (const [i, sideTask] of current_list.sideTasks.entries()) {
      buttonsArray.push(Markup.button.callback(`${sideTask.name}`, `${sideTask.id}`))

    }


    buttonsArray.push(Markup.button.callback(ctx.i18n.t('return_button'), 'reenter'))
    return buttonsArray
  }

  await ctx.reply(ctx.i18n('mainComplex_scene_keyBoard_sideTaskMenu_header'),
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
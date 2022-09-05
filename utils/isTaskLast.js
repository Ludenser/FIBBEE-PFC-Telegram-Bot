/**
 * Функция, определяющая является ли текущий таск последним.
 * @param {[Object]} all_lists - массив объектов всех тасклистов
 * @param {String} task_id - ClickUp-Id of current task
 */


module.exports = (session) => {

  // const currentList = session.all_lists.find(o => o.list_id === session.states.currentList_id)

  // if (session.currentTask_id === currentList.lastTask) {
  //   ctx.session.states.isTaskLast = true
  // }

  session.all_lists.forEach((el, i) => {
    if (session.states.currentTask_id.includes(session.all_lists[i].tasksWithoutDriverTaskAndSide.at(-1).id)) {
      session.states.isTaskLast = true
    }

  });
}
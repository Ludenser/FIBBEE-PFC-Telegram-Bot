/**
 * Функция, определяющая является ли текущий таск последним.
 * @param {[Object]} all_lists - массив объектов всех тасклистов
 * @param {String} task_id - ClickUp-Id of current task
 */


module.exports = (session) => {

  session.states.isTaskFirst = false

  if (session.states.currentTask_id.includes(session.all_lists[session.currentRouteNumber].tasksWithoutDriverTaskAndSide.at(-1).id)) {
    session.states.isTaskLast = true
  }
  if (session.states.currentTask_id.includes(session.all_lists[session.currentRouteNumber].tasksWithoutDriverTaskAndSide.at(0).id)) {
    session.states.isTaskFirst = true
  }

}
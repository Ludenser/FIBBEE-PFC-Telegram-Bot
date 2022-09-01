/**
 * Функция, определяющая является ли текущий таск последним.
 * @param {[Object]} all_lists - массив объектов всех тасклистов
 * @param {String} task_id - ClickUp-Id of current task
 */

module.exports = (all_lists, task_id) => {
  let isTaskLast = false
  all_lists.forEach((el, i) => {
    if (task_id.includes(all_lists[i].tasksWithoutDriverTask.at(-1).id)) {
      isTaskLast = true
    }

  });
  return isTaskLast
}
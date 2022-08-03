module.exports = (all_lists, task_id) => {
  let isTaskLast = false
  all_lists.forEach((el, i) => {
    if (task_id.includes(all_lists[i].tasksWithoutMain.at(-1).id)) {
      isTaskLast = true
    }

  });
  return isTaskLast
}
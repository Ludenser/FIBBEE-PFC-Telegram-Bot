module.exports = (task_id, ctx) => {
  if (task_id.includes(ctx.all_tasksSupply.at(-1).id) || task_id.includes(ctx.all_tasksClean.at(-1).id)) {
    return true
  }
}
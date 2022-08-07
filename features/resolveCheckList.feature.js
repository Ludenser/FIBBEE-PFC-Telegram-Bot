const _ = require('lodash');
const { Task } = require('../api/clickUpApi.service');

const resolveCurrentChecklistAndItems = async (checklist_id, resolved) => {
  const response = await Task.getCheckList(checklist_id)
  const checklistsArr = response.data.checklist

  _(checklistsArr.items)
    .forEach(async (element) => {
      if (element.children.length) {
        _(element.children)
          .forEach(async (element) => {
            await Task.resolveCheckListItem(element.id, resolved)
          })
      }
      await Task.resolveCheckListItem(element.id, resolved)
    });
}

const resolveAllCheckListsAndItems = async (checklists, resolved) => {
  _(checklists)
    .forEach(async element => {
      await resolveCurrentChecklistAndItems(element.id, resolved)
    })
}

module.exports = {
  resolveAllCheckListsAndItems,
  resolveCurrentChecklistAndItems
}
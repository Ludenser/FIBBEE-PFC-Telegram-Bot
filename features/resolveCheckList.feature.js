const _ = require('lodash');
const { Task } = require('../api/clickUpApi.service');

/**
   * Функция для отметки элемента чек-листа и вложенных в него элементов решенными.
   * @param {String} checklist_id - CkickUp checklist id
   * @param {Boolean} resolved - ( Default is 'true')
   */

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

/**
   * Функция для групповой отметки всех элементов чек-листа во всех чек-листах таска решенными
   * @param {[Object]} checklists - массив объектов всех чеклистов таска.
   * @param {Boolean} resolved - ( Default is 'true')
   */

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
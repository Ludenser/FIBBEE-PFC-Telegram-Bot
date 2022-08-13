const _ = require('lodash');
const Clickup = require('../api');
const { sendError } = require('../utils/sendLoadings');

/**
   * Функция для отметки элемента чек-листа и вложенных в него элементов решенными.
   * @param {String} checklist_id - CkickUp checklist id
   * @param {Boolean} resolved - ( Default is 'true')
   */

const resolveCurrentChecklistAndItems = async (checklist_id, resolved, CU_Token) => {

  const client = new Clickup(CU_Token)

  const response = await client.Tasks.getCheckList(checklist_id)
  const checklistsArr = response.data.checklist

  _(checklistsArr.items)
    .forEach(async (element) => {
      if (element.children.length) {
        _(element.children)
          .forEach(async (element) => {
            await client.Tasks.resolveCheckListItem(element.id, resolved)
          })
      }
      await client.Tasks.resolveCheckListItem(element.id, resolved)
    });
}

/**
   * Функция для групповой отметки всех элементов чек-листа во всех чек-листах таска решенными
   * @param {[Object]} checklists - массив объектов всех чеклистов таска.
   * @param {Boolean} resolved - ( Default is 'true')
   */

const resolveAllCheckListsAndItems = async (checklists, resolved, CU_Token) => {
  _(checklists)
    .forEach(async element => {
      try {
        await resolveCurrentChecklistAndItems(element.id, resolved, CU_Token)
      } catch (error) {
        console.log(error)
      }

    })
}

module.exports = {
  resolveAllCheckListsAndItems,
  resolveCurrentChecklistAndItems
}
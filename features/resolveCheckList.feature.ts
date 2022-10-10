import _ from 'lodash';
import { Clickup } from '../api';
import { Checklist } from '../global';

/**
   * Функция для отметки элемента чек-листа и вложенных в него элементов решенными.
   * @param {String} checklist_id - CkickUp checklist id
   * @param {Boolean} resolved - ( Default is 'true')
   * @param {String} CU_Token - Токен Clickup для текущего пользователя, инициирующего action.
   */

export const resolveCurrentChecklistAndItems = async (checklist_id: string, resolved: 'true' | 'false' = 'true', CU_Token: string) => {

  const ClickAPI = new Clickup(CU_Token)

  const response = await ClickAPI.Tasks.getCheckList(checklist_id)
  const checklistsArr = response.data.checklist

  _(checklistsArr.items)
    .forEach(async (element) => {
      if (element.children.length) {
        _(element.children)
          .forEach(async (element) => {
            await ClickAPI.Tasks.resolveCheckListItem(element.id, resolved)
          })
      }
      await ClickAPI.Tasks.resolveCheckListItem(element.id, resolved)
    });
}

/**
   * Функция для групповой отметки всех элементов чек-листа во всех чек-листах таска решенными
   * @param {Checklist[]} checklists - массив объектов всех чеклистов таска.
   * @param {Boolean} resolved - ( Default is 'true')
   * @param {String} CU_Token - Токен Clickup для текущего пользователя, инициирующего action.
   */

export const resolveAllCheckListsAndItems = async (checklists: Checklist[], resolved: 'true' | 'false' = 'true', CU_Token: string) => {
  _(checklists)
    .forEach(async element => {
      try {
        await resolveCurrentChecklistAndItems(element.id, resolved, CU_Token)
      } catch (error) {
        console.log(error)
      }

    })
}

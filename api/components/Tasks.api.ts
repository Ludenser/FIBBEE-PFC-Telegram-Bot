import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';
import qs from 'qs';
import { Task } from '../../global';
import dueTime from '../../utils/timePeriodDate'
import { Settings } from '../../config/setting';
import { ResponseChecklist, ResponseTasks } from '../models';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });
/**
    * Взаимодействия с тасками.
    */

export interface Tasks {
  token: string
}
export class Tasks {
  constructor(token: string) {
    this.token = token
  }

  /**
      * Получение Object[ ] указанного таска
      * @param {String} task_id - ClickUp-Ids of current task
      */
  async getTaskByTaskId(task_id: string) {
    
    const response = await axios.get<Task>(`https://api.clickup.com/api/v2/task/${task_id}/`,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }

  /**
      * Получение Object[ ] всех тасков в таск-листе со статусом 'to do' и 'in progress', в диапазоне времени от "3 часов до текущего времени" и "20 часов после текущего времени.
      * @param {String[]} list_ids - ClickUp-Ids of current task-list
      */
  async getTodayTasksWithAnyStatus(list_ids: string[]) {

    const response = await axios.get<ResponseTasks>(`https://api.clickup.com/api/v2/team/${Settings.TEAM_ID}/task`,
      {
        params: {
          statuses: ['to do', 'in progress'],
          list_ids,
          order_by: 'due_date',
          due_date_gt: dueTime(-3),
          due_date_lt: dueTime(20)
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        },
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }
  /**
      * Получение Object[ ] всех тасков в таск-листе только со статусом 'to do', в диапазоне времени от "8 часов до текущего времени" и "13 часов после текущего времени".
      * @param {String[]} list_ids - ClickUp-Ids of current task-list
      */
  async getTodayTasksWithStatusTodo(list_ids: string | string[]) {

    const response = await axios.get<ResponseTasks>(`https://api.clickup.com/api/v2/team/${Settings.TEAM_ID}/task`,
      {
        params: {
          statuses: ['to do'],
          list_ids,
          order_by: 'due_date',
          due_date_gt: dueTime(-10),
          due_date_lt: dueTime(13)
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        },
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Установка статуса таску
      * @param {String} task_id ClickUp-Id of current task
      * @param {String} updatedStatus Status to be set for the current task. 
      */
  async setStatus(task_id: string, updatedStatus: 'to do' | 'in progress' | 'done') {
    const response = await axios.put(`https://api.clickup.com/api/v2/task/${task_id}/`,
      {
        'status': updatedStatus
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Назначение юзера к таску
      * @param {String} task_id ClickUp-Id of current task
      * @param {Number} user_id ClickUp-Id of current user
      */
  async setAssignee(task_id: string, user_id: number) {
    const response = await axios.put(`https://api.clickup.com/api/v2/task/${task_id}/`,
      {
        'assignees': {
          'add': [
            user_id
          ]
        }
      },
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

  /**
      * Создание комментария в таске
      * @param {String} message_text text from telegram.update.message
      * @param {String} task_id ClickUp-Id of current task
      */
  async createComment(message_text: string, task_id: string) {

    await axios({
      method: 'post',
      url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
      data: {
        'comment': [
          {
            'text': message_text,
          }
        ]
      },
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(() => console.log('Коммент прикреплен к таску!'))
      .catch((e) => console.log(e))

  }
  /**
      * Создание комментария в таске c тегом юзера.
      * @param {String} message_text text from .update.message
      * @param {String} task_id - ClickUp-Id of current task
      * @param {Number} user_id - ClickUp-Id of user to be tagged
      */
  async createCommentWithAssignee(message_text: string, task_id: string, user_id: number) {

    await axios({
      method: 'post',
      url: `https://api.clickup.com/api/v2/task/${task_id}/comment`,
      data: {
        'comment': [
          {
            'text': message_text,
          }
        ],
        'assignee': user_id
      },
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(() => console.log('Коммент прикреплен к таску!'))
      .catch((e) => console.log(e))

  };

  /**
      * Создание аттачмента в таске
      * @param {String} message_id telegram message id from .update.message.message_id
      * @param {String} task_id ClickUp-Id of current task
      * @param {ReadableStream} stream - Readable stream from telegram getFileLink() or same type from other source.
      */
  async createAttachment(message_id: number, task_id: string, stream: AxiosResponse<any>) {
    const form = new FormData();
    form.append('attachment', stream)
    form.append('filename', `${message_id}.jpg`)

    await axios({
      method: 'post',
      url: `https://api.clickup.com/api/v2/task/${task_id}/attachment`,
      data: form,
      headers: {
        'Authorization': this.token,
        'content-type': `multipart/form-data; boundary=${form.getBoundary()}`
      },
    })

      .then((r) => console.log(`В таск ${task_id} загружено фото из ${message_id}`))
      .catch((e) => console.log(e.config, message_id, 'Не загружено'))

  };

  /**
     * Получение чеклиста
     * @param {String} checklist_id - task's checklist ClickUp-uuid
     */
  async getCheckList(checklist_id: string) {

    const response = await axios.put<ResponseChecklist>(`https://api.clickup.com/api/v2/checklist/${checklist_id}`,
      {
        'position': 0
      }
      ,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  };

  /**
     * Отметка элемента чек-листа решенным(по-дефолту)/нерешенным
     * @param {String} checklist_item_id - ClickUp checklist item id
     * @param {Boolean} resolved 
     */
  async resolveCheckListItem(checklist_item_id: string, resolved: 'true' | 'false') {

    const response = await axios({
      method: 'put',
      url: `https://api.clickup.com/api/v2/checklist/checklist_id/checklist_item/${checklist_item_id}`,
      data:
      {
        resolved
      }
      ,
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      },
    })
    return response
  };

}
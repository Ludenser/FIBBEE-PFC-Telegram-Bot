import axios from 'axios';
import { ResponseCustomFields } from '../models';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export interface Custom_fields {
  token:string;
}
export class Custom_fields {
  constructor(token:string) {
    this.token = token
  }
  async getAllCustomFields(list_id:string) {
    const response = await axios.get<ResponseCustomFields>(`https://api.clickup.com/api/v2/list/${list_id}/field`,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response.data
  }
  /**
        * Создание комментария в таске c тегом юзера.
        * @param {String} task_id - ClickUp-Id of current task
        * @param {String} field_id - ClickUp-Id of user to be tagged
        * @param {String} value - text from .update.message
        */
  async setValue(task_id: string, field_id: string, value: string) {
    await axios({
      method: 'post',
      url: `https://api.clickup.com/api/v2/task/${task_id}/field/${field_id}`,
      data: {
        value
      },
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(() => console.log('Custom-field обновлен!'))
      .catch((e) => console.log(e))
  }
  /**
        * Создание комментария в таске c тегом юзера.
        * @param {String} task_id - ClickUp-Id of current task
        * @param {String} field_id - ClickUp-Id of user to be tagged
        */
  async removeValue(task_id: string, field_id: string) {
    await axios({
      method: 'delete',
      url: `https://api.clickup.com/api/v2/task/${task_id}/field/${field_id}`,
      data: {},
      headers: {
        'Authorization': this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(() => console.log('Custom-field стёрт!'))
      .catch((e) => console.log(e))

  }
}

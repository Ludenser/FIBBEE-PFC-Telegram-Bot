import axios from 'axios';
import { ResponseMembers, ResponseUser } from '../models';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });
/**
    * Взаимодействия с пользователями.
    */

export interface Users {
  token:string;
}
export class Users {

  constructor(token:string) {
    this.token = token
  }

  /**
      * Получение объекта юзера, аутентифицированного под текущим ClickUp токеном
      */
  async getUser_ByToken() {
    const response = await axios.get<ResponseUser>('https://api.clickup.com/api/v2/user',
      {
        headers: {
          'Authorization': this.token
        }
      })
    return response
  }

  /**
      * Получение объекта всех юзеров, имеющих доступ к указанному таск-листу "по умолчанию"
      * @param {String} list_id - ClickUp-Id of current task-list
      */
  async getUsers_id(list_id: string) {
    const response = await axios.get<ResponseMembers>(`https://api.clickup.com/api/v2/list/${list_id}/member`,
      {
        headers: {
          'Authorization': this.token,
          'Content-Type': 'application/json'
        }
      })
    return response
  }

}

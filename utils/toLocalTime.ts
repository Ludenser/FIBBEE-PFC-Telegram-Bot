import { Task } from '../global';
import moment from 'moment-timezone';


/**
  *Функция, преобразующая Epoch-time в отформатированное локальное время. 
  * @param {Object} task - объект текущего таска. 
  */
export default (task: Task) => {
  moment.locale('ru');
  const timeStamp_Start = new Date(Number.parseInt(task.start_date));
  const timeStamp_Due = new Date(Number.parseInt(task.due_date));

  const timeStart = moment.tz(timeStamp_Start, 'Europe/Moscow').format('LT');
  const timeDue = moment.tz(timeStamp_Due, 'Europe/Moscow').format('LT');

  return {
    timeStart,
    timeDue
  }
};
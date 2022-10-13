import { Session } from '../global'
/**
 * Функция, определяющая является ли текущий таск последним.
 */

export default (session: Session) => {

  if (session.states.current.task.id.includes(session.all_lists[session.currentRouteNumber].tasksWithoutDriverTaskAndSide.at(-1).id)) {
    session.states.isTaskLast = true
  }

}
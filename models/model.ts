import { Task as apiTask } from "../api/models/index";

export interface MyContext {
    sessions: Session[];
}

export interface ExtContext {
    session: Data;
}

export interface User {
    id: number;
    username: string;
    CU_Token: string;
}

export interface AllExistLabel {
    id: string;
    label: string;
    color: string;
}

export interface RouteMsg {
    id: any[];
    isDeleted: boolean;
}

export interface AttentionMsg {
    id: any[];
    isDeleted: boolean;
}

export interface Task {
    id: string;
    discordWebHook: string;
    locationName: string;
    locationLabel: string;
}

export interface SideTask {
    id: string;
    ids: any[];
    name: string;
}

export interface Current {
    task: Task;
    side_task: SideTask;
    list_id: string;
    menu_state: string;
}

export interface States {
    isTaskLast: boolean;
    route_msg: RouteMsg;
    attention_msg: AttentionMsg;
    current: Current;
}

export interface AllLists {
    list_id: string;
    sideTasks?: apiTask[];
    driverTask: apiTask[];
    isOpened?: boolean;
    tasksWithoutDriverTaskAndSide: apiTask[];
}



export interface Data {
    all_lists: AllLists[];
    userName: string;
    isAuthUser: boolean;
    user: User;
    all_existLabels: AllExistLabel[];
    team_id: string;
    isAlreadyFilled: boolean;
    states: States;
}

export interface Session {
    id: string;
    data: Data;
}


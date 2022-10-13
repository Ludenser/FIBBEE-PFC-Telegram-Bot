import { I18nContext } from '@grammyjs/i18n/dist/source';
import { Context } from 'telegraf';
import { SceneContextScene, WizardContextWizard, WizardSession, WizardSessionData } from 'telegraf/typings/scenes';

export interface SessionCtx extends Context {
    startPayload: string;
    i18n: I18nContext;
    session: Session;
    scene: SceneContextScene<SessionCtx, WizardSessionData>;
    wizard: WizardContextWizard<SessionCtx>
}

export interface Task {
    id: string;
    custom_id: null;
    name: string;
    text_content: string;
    description: string;
    status: Status;
    orderindex: string;
    date_created: string;
    date_updated: string;
    date_closed: null;
    archived: boolean;
    creator: Creator;
    assignees: any[];
    watchers: any[];
    checklists: Checklist[];
    tags: any[];
    parent: null;
    priority: null;
    due_date: string;
    start_date: string;
    points: null;
    time_estimate: null;
    custom_fields: CustomField[];
    dependencies: any[];
    linked_tasks: any[];
    team_id: string;
    url: string;
    permission_level: string;
    list: Folder;
    project: Folder;
    folder: Folder;
    space: Space;
}
export interface Session extends WizardSession {
    clickUpUser: Creator;
    userName: string;
    isAuthUser: boolean;
    user: SessionUser;
    currentRouteNumber: number;
    all_lists: AllList[];
    team_id: string;
    isAlreadyFilled: boolean;
    states: States;
}

export interface AllList {
    list_id: string;
    driverTask: DriverTask[];
    sideTasks?: Task[],
    tasksWithoutDriverTaskAndSide: TasksWithoutDriverTaskAndSide[];
}

export interface DriverTask {
    id: string;
    custom_id: null;
    name: string;
    text_content: string;
    description: string;
    status: Status;
    orderindex: string;
    date_created: string;
    date_updated: string;
    date_closed: null;
    archived: boolean;
    creator: Creator;
    assignees: any[];
    watchers: any[];
    checklists: Checklist[];
    tags: any[];
    parent: null;
    priority: null;
    due_date: string;
    start_date: string;
    points: null;
    time_estimate: null;
    custom_fields: CustomField[];
    dependencies: any[];
    linked_tasks: any[];
    team_id: string;
    url: string;
    permission_level: string;
    list: Folder;
    project: Folder;
    folder: Folder;
    space: Space;
}

export interface Checklist {
    id: string;
    task_id: string;
    name: string;
    date_created: string;
    orderindex: number;
    creator: number;
    resolved: number;
    unresolved: number;
    items: Item[];
}

export interface Item {
    id: string;
    name: string;
    orderindex: number;
    assignee: null;
    group_assignee: null;
    resolved: boolean;
    parent: null | string;
    date_created: string;
    children: Item[];
}

export interface Creator {
    id: number;
    username: string;
    email: string;
    color: string;
    initials: string;
    profilePicture: string;
}


export interface CustomField {
    id: string;
    name: string;
    type: Type;
    type_config: TypeConfig;
    date_created: string;
    hide_from_guests: boolean;
    required: boolean;
    value?: string[] | string;
}


export enum Type {
    AutomaticProgress = "automatic_progress",
    Labels = "labels",
    ShortText = "short_text",
    Text = "text",
}

export interface TypeConfig {
    tracking?: Tracking;
    complete_on?: number;
    subtask_rollup?: boolean;
    options?: any[];
}

export interface Tracking {
    checklists: boolean;
}

export interface ValueClass {
    percent_complete: number;
}

export interface Folder {
    id: string;
    name: string;
    hidden?: boolean;
    access: boolean;
}

export interface Space {
    id: string;
}

export interface Status {
    status: string;
    color: string;
    type: string;
    orderindex: number;
}

export interface TasksWithoutDriverTaskAndSide {
    id: string;
    custom_id: null;
    name: string;
    text_content: string;
    description: string;
    status: Status;
    orderindex: string;
    date_created: string;
    date_updated: string;
    date_closed: null;
    archived: boolean;
    creator: Creator;
    assignees: any[];
    watchers: any[];
    checklists: Checklist[];
    tags: any[];
    parent: null;
    priority: null;
    due_date: string;
    start_date: string;
    points: null;
    time_estimate: null;
    custom_fields: CustomField[];
    dependencies: any[];
    linked_tasks: any[];
    team_id: string;
    url: string;
    permission_level: string;
    list: Folder;
    project: Folder;
    folder: Folder;
    space: Space;
}

export type ValueUnion = string[] | ValueClass | string;

export interface States {
    isTaskLast?: boolean;
    route_msg?: Msg;
    attention_msg?: Msg;
    current?: Current;
}

export interface Msg {
    id: number[];
    isDeleted: boolean;
}

export interface Current {
    task?: SessionTask;
    side_task?: SideTask;
    menu_state?: string;
    list_id?: string;
}

export interface SideTask {
    id?: string;
    ids?: any[];
    name?: string;
}

export interface SessionTask {
    locationName?: string;
    locationLabel?: string;
    id?: string;
    discordWebHook?: string;
}

export interface SessionUser {
    id: number;
    username: string;
    CU_Token: string;
}

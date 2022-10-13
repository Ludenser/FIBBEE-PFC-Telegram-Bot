import { Checklist, Creator as ClickUser, Task } from '../../global';

export interface ResponseUser {
    user: ClickUser;
}

export interface ResponseMembers {
    members: ClickUser[];
}

export interface ResponseTime {
    data: Datum[];
}

export interface Datum {
    user: ClickUser;
    time: number;
    intervals: TimerInterval[];
}

export interface TimerInterval {
    id: string;
    start: string;
    end: string;
    time: string;
    source: string;
    date_added: string;
    billable: boolean;
    description: string;
    tags: null;
}

export interface ResponseCustomFields {
    fields: CustomField[];
}

export interface CustomField {
    id: string;
    name: string;
    type: string;
    type_config: TypeConfig;
    date_created: string;
    hide_from_guests: boolean;
    required: boolean;
}

export interface TypeConfig {
    tracking?: Tracking;
    complete_on?: number;
    subtask_rollup?: boolean;
    options?: Option[];
}

export interface Option {
    id: string;
    label: string;
    color: string;
}

export interface Tracking {
    checklists: boolean;
}

export interface ResponseChecklist {
    checklist: Checklist;
}

export interface ResponseTasks {
    tasks: Task[]
}

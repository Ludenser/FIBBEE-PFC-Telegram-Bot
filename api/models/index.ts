export interface RootObject {
    tasks: Task[];
}


export interface Status {
    status: string;
    color: string;
    type: string;
    orderindex: number;
}

export interface Creator {
    id: number;
    username: string;
    color: string;
    email: string;
    profilePicture: string;
}

export interface Assignee {
    id: number;
    username: string;
    color: string;
    initials: string;
    email: string;
    profilePicture: string;
}

export interface Child {
    id: string;
    name: string;
    orderindex: number;
    assignee?: any;
    group_assignee?: any;
    resolved: boolean;
    parent: string;
    date_created: string;
    children: any[];
}

export interface Item {
    id: string;
    name: string;
    orderindex: number;
    assignee?: any;
    group_assignee?: any;
    resolved: boolean;
    parent?: any;
    date_created: string;
    children: Child[];
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

export interface Option {
    id: string;
    label: string;
    color: string;
}

export interface TypeConfig {
    options: Option[];
    include_guests?: boolean;
    include_team_members?: boolean;
    single_user?: boolean;
}

export interface CustomField {
    id: string;
    name: string;
    type: string;
    type_config: TypeConfig;
    date_created: string;
    hide_from_guests: boolean;
    required: boolean;
    value: any;
}

export interface List {
    id: string;
    name: string;
    access: boolean;
}

export interface Project {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
}

export interface Folder {
    id: string;
    name: string;
    hidden: boolean;
    access: boolean;
}

export interface Space {
    id: string;
}

export interface Task {
    id: string;
    custom_id?: any;
    name: string;
    text_content: string;
    description: string;
    status: Status;
    orderindex: string;
    date_created: string;
    date_updated: string;
    date_closed?: any;
    archived: boolean;
    creator: Creator;
    assignees: Assignee[];
    watchers: any[];
    checklists: Checklist[];
    tags: any[];
    parent?: any;
    priority?: any;
    due_date: string;
    start_date: string;
    points?: any;
    time_estimate?: any;
    custom_fields: CustomField[];
    dependencies: any[];
    linked_tasks: any[];
    team_id: string;
    url: string;
    permission_level: string;
    list: List;
    project: Project;
    folder: Folder;
    space: Space;
    time_spent?: number;
}



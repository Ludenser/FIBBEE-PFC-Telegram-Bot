
import { Tasks } from './components/Tasks.api';
import { TimeTracking } from "./components/TimeTracking.api";
import { Users } from "./components/Users.api";
import { Custom_fields } from "./components/Custom_fields.api";
import { Token } from './components/Token.api';

export interface Clickup {
  token: string;
  Token: Token;
  Tasks: Tasks;
  TimeTracking: TimeTracking;
  Users: Users;
  Custom_fields: Custom_fields;
}

export class Clickup {
  constructor(token?: string) {
    this.token = token;
    this.Token = new Token;
    this.Tasks = new Tasks(this.token);
    this.TimeTracking = new TimeTracking(this.token);
    this.Users = new Users(this.token);
    this.Custom_fields = new Custom_fields(this.token)
  }
}

const Tasks = require('./components/Tasks.api');
const TimeTracking = require("./components/TimeTracking.api");
const Users = require("./components/Users.api");

class Clickup {
  constructor(token) {
    this.token = token;

    this.Tasks = new Tasks(this.token);
    this.TimeTracking = new TimeTracking(this.token);
    this.Users = new Users(this.token);
  }
}

module.exports = Clickup;



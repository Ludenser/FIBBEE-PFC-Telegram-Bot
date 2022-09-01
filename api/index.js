
const Tasks = require('./components/Tasks.api');
const TimeTracking = require("./components/TimeTracking.api");
const Users = require("./components/Users.api");
const Custom_fields = require("./components/Custom_fields.api")

class Clickup {
  constructor(token) {
    this.token = token;

    this.Tasks = new Tasks(this.token);
    this.TimeTracking = new TimeTracking(this.token);
    this.Users = new Users(this.token);
    this.Custom_fields = new Custom_fields(this.token)
  }
}

module.exports = Clickup;



const User = require("./user.model");
const Transaction = require("./transaction.model");
const Timesheet = require("./timesheet.model");
const Task = require("./task.model");
const Role = require("./role.model");
const Project = require("./project.model");
const Permission = require("./permission.model");
const Log = require("./log.model");
const Associate = require("./associate.model");

Role.hasMany(Permission, { foreignKey: "role_id" });
Permission.belongsTo(Role, { foreignKey: "role_id" });

Role.hasMany(Associate, { foreignKey: "role_id" });
Associate.belongsTo(Role, { foreignKey: "role_id" });

Project.hasMany(Associate, { foreignKey: "project_id" });
Associate.belongsTo(Project, { foreignKey: "project_id" });

User.hasMany(Associate, { foreignKey: "user_id" });
Associate.belongsTo(User, { foreignKey: "user_id" });

Associate.hasMany(Task, { foreignKey: "associate_id" });
Task.belongsTo(Associate, { foreignKey: "associate_id" });

Task.hasMany(Task, { foreignKey: "parent_id", as: "subTasks" });
Task.belongsTo(Task, { foreignKey: "parent_id", as: "parentTask" });

Task.hasMany(Timesheet, { foreignKey: "task_id" });
Timesheet.belongsTo(Task, { foreignKey: "task_id" });

Associate.hasMany(Log, { foreignKey: "associate_id" });
Log.belongsTo(Associate, { foreignKey: "associate_id" });

Associate.hasMany(Transaction, { foreignKey: "associate_id" });
Transaction.belongsTo(Associate, { foreignKey: "associate_id" });

module.exports = {
  User,
  Transaction,
  Timesheet,
  Task,
  Role,
  Project,
  Permission,
  Log,
  Associate,
};

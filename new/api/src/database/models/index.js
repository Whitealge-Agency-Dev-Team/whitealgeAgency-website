const User = require("./user.model");
const Transaction = require("./transaction.model");
const Timesheet = require("./timesheet.model");
const Task = require("./task.model");
const Role = require("./role.model");
const Project = require("./project.model");
const Permission = require("./permission.model");
const Associate = require("./associate.model");
const Token = require("./token.model");
const Company = require("./company.model");
const Invoice = require("./invoice.model");
const Assignment = require("./assignment.model");

Role.hasMany(Permission, { foreignKey: "role_id" });
Permission.belongsTo(Role, { foreignKey: "role_id" });

User.hasMany(Token, { foreignKey: "user_id", onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Associate, { foreignKey: "user_id" });
Associate.belongsTo(User, { foreignKey: "user_id" });

Company.hasMany(Associate, { foreignKey: "company_id" });
Associate.belongsTo(Company, { foreignKey: "company_id" });

Company.hasMany(Project, { foreignKey: "company_id" });
Project.belongsTo(Company, { foreignKey: "company_id" });

Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

Task.hasMany(Timesheet, { foreignKey: "task_id" });
Timesheet.belongsTo(Task, { foreignKey: "task_id" });

Associate.hasMany(Timesheet, { foreignKey: "associate_id" });
Timesheet.belongsTo(Associate, { foreignKey: "associate_id" });

Project.hasMany(Assignment, { foreignKey: "project_id" });
Assignment.belongsTo(Project, { foreignKey: "project_id" });

Associate.hasMany(Assignment, { foreignKey: "associate_id" });
Assignment.belongsTo(Associate, { foreignKey: "associate_id" });

Role.hasMany(Assignment, { foreignKey: "role_id" });
Assignment.belongsTo(Role, { foreignKey: "role_id" });

Associate.hasMany(Transaction, { foreignKey: "associate_id" });
Transaction.belongsTo(Associate, { foreignKey: "associate_id" });

Invoice.hasMany(Transaction, { foreignKey: "invoice_id" });
Transaction.belongsTo(Invoice, { foreignKey: "invoice_id" });

module.exports = {
  User,
  Transaction,
  Timesheet,
  Task,
  Role,
  Project,
  Permission,
  Associate,
  Token,
  Company,
  Invoice,
  Assignment,
};
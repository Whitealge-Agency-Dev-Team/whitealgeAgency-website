const User = require("./user.model");
const Transaction = require("./transaction.model");
const Timesheet = require("./timesheet.model");
const Task = require("./task.model");
const Role = require("./role.model");
const Project = require("./project.model");
const Permission = require("./permission.model");
const Log = require("./log.model");
const Associate = require("./associate.model");
const Token = require("./token.model");
const Company = require("./company.model");
const Invoice = require("./invoice.model");
const Member = require("./member.model");

//RELACION ROL-PERMISOS
Role.hasMany(Permission, { foreignKey: "role_id" });
Permission.belongsTo(Role, { foreignKey: "role_id" });

//ROLES-MIEMBROS
Role.belongsToMany(Member, { through: "member_roles" });
Member.belongsToMany(Role, { through: "member_roles" });

//ROLES-ASOCIADOS
Role.belongsToMany(Associate, { through: "associate_roles" });
Associate.belongsToMany(Role, { through: "associate_roles" });

//USUARIO-TOKENS
User.hasMany(Token, { foreignKey: "user_id" });
Token.belongsTo(User, { foreignKey: "user_id" });

//USUARIO-ASOCIADOS
User.hasMany(Associate, { foreignKey: "user_id" });
Associate.belongsTo(User, { foreignKey: "user_id" });

//COMPAÑIA-ASOCIADOS
Company.hasMany(Associate, { foreignKey: "company_id" });
Associate.belongsTo(Company, { foreignKey: "company_id" });

//COMPAÑIA-PROYECTOS
Company.hasMany(Project, { foreignKey: "company_id" });
Project.belongsTo(Company, { foreignKey: "company_id" });

//ASOCIADO-LOGS
Associate.hasMany(Log, { foreignKey: "associate_id" });
Log.belongsTo(Associate, { foreignKey: "associate_id" });

//ASOCIADO-TRANSACCIONES
Associate.hasMany(Transaction, { foreignKey: "associate_id" });
Transaction.belongsTo(Associate, { foreignKey: "associate_id" });

//TRANSACCIONES-FACTURAS
Transaction.belongsToMany(Invoice, { through: "payments" });
Invoice.belongsToMany(Transaction, { through: "payments" });

//ASOCIADO-MIEMBROS
Associate.hasMany(Member, { foreignKey: "associate_id" });
Member.belongsTo(Associate, { foreignKey: "associate_id" });

//PROYECTO-MIEMBROS
Project.hasMany(Member, { foreignKey: "project_id" });
Member.belongsTo(Project, { foreignKey: "project_id" });

//MIEMBRO-TIEMPOS
Member.hasMany(Timesheet, { foreignKey: "member_id" });
Timesheet.belongsTo(Member, { foreignKey: "member_id" });

//TAREA-TIEMPOS
Task.hasMany(Timesheet, { foreignKey: "task_id" });
Timesheet.belongsTo(Task, { foreignKey: "task_id" });

//PROYECTO-TAREAS
Project.hasMany(Task, { foreignKey: "project_id" });
Task.belongsTo(Project, { foreignKey: "project_id" });

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
  Token,
  Company,
  Invoice,
  Member,
};

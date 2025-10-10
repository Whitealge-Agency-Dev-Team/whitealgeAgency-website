const Status = require("./status");

const User = require("./user/user");
const Salary = require("./user/salary");
const UserDimiss = require("./user/userDimiss");

const Role = require("./user/role/role");
const Permission = require("./user/role/permission");
const Resource = require("./user/role/resource");
const RolePermissionResource = require("./user/role/rolePermissionResource");

const Project = require("./project/project");
const ProjectDimiss = require("./project/projectDimiss");
const Objective = require("./project/objective");
const KeyDate = require("./project/keyDate");

const Client = require("./client/client");
const Engage = require("./client/engage");
const Interview = require("./client/interview");
const Note = require("./client/note");
const Representative = require("./client/representative");

Role.hasMany(RolePermissionResource);
Resource.hasMany(RolePermissionResource);
Permission.hasMany(RolePermissionResource);
RolePermissionResource.belongsTo(Role, {
  foreignKey: "roleId",
  onDelete: "CASCADE",
});
RolePermissionResource.belongsTo(Resource, {
  foreignKey: "resourceId",
  onDelete: "CASCADE",
});
RolePermissionResource.belongsTo(Permission, {
  foreignKey: "permissionId",
  onDelete: "CASCADE",
});

Role.hasMany(User);
User.belongsTo(Role, { foreignKey: "roleId" });

User.hasMany(Salary);
Salary.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

User.hasMany(UserDimiss);
UserDimiss.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

User.belongsToMany(Project, {
  through: "user_project",
  foreignKey: "userId",
  otherKey: "projectId",
  onDelete: "CASCADE",
});
Project.belongsToMany(User, {
  through: "user_project",
  foreignKey: "projectId",
  otherKey: "userId",
  onDelete: "RESTRICT",
});

Project.hasMany(ProjectDimiss);
ProjectDimiss.belongsTo(Project, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

Project.hasMany(Objective);
Objective.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });

Project.hasMany(KeyDate);
KeyDate.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });

Project.belongsToMany(Client, {
  through: "project_client",
  foreignKey: "projectId",
  otherKey: "clientId",
  onDelete: "CASCADE",
});
Client.belongsToMany(Project, {
  through: "project_client",
  foreignKey: "clientId",
  otherKey: "projectId",
  onDelete: "RESTRICT",
});

Client.hasMany(Representative);
Representative.belongsTo(Client, {
  foreignKey: "clientId",
  onDelete: "CASCADE",
});

Client.belongsToMany(Engage, {
  through: "engage_client",
  foreignKey: "clientId",
  otherKey: "engageId",
  onDelete: "CASCADE",
});
Engage.belongsToMany(Client, {
  through: "engage_client",
  foreignKey: "engageId",
  otherKey: "clientId",
  onDelete: "CASCADE",
});

Representative.hasMany(Interview);
Interview.belongsTo(Representative, { foreignKey: "representativeId" });

Interview.hasMany(Note);
Note.belongsTo(Interview, { foreignKey: "interviewId", onDelete: "CASCADE" });

Status.hasMany(Project);
Project.belongsTo(Status, { foreignKey: "statusId" });

Status.hasMany(Client);
Client.belongsTo(Status, { foreignKey: "statusId" });

Status.hasMany(Interview);
Interview.belongsTo(Status, { foreignKey: "statusId" });

module.exports = {
  Status,

  Interview,
  Note,

  Representative,
  Client,

  Project,
  Objective,
  ProjectDimiss,
  KeyDate,

  User,
  UserDimiss,
  Salary,

  Role,
  Permission,
  Resource,
};

/*
const CRM_PERMISSIONS = {
  admin: {
    users: ['create', 'read', 'update'],
    user_dismiss: ['read'],
    roles: ['read'],
    permissions: ['read'],
    role_permissions: ['read'],
    clients: ['create', 'read', 'update'],
    interviews: ['create', 'read', 'update'],
    dept_issues: ['create', 'read', 'update'],
    projects: ['create', 'read', 'update'],
    objectives: ['create', 'read', 'update'],
    departments: ['create', 'read', 'update'],
    dept_functions: ['create', 'read', 'update'],
    project_dismiss: ['create', 'read', 'update']
  },

  team_manager: {
    clients: ['create', 'read', 'update'],
    interviews: ['create', 'read', 'update'],
    dept_issues: ['create', 'read', 'update'],
    projects: ['create', 'read', 'update'],
    objectives: ['create', 'read', 'update'],
    departments: ['create', 'read', 'update'],
    dept_functions: ['create', 'read', 'update'],
    project_dismiss: ['create', 'read', 'update']
  },

  support_agent: {
    clients: ['read', 'update'],
    projects: ['read', 'update'],
    interviews: ['read', 'update'],
    project_dismiss: ['read', 'update'],
    objectives: ['read', 'update']
  }
};

module.exports = { CRM_PERMISSIONS };
*/

const CRM_PERMISSIONS = {
  admin: {
    users: ['create', 'read', 'update', 'delete'],
    salaries: ['create', 'read', 'update', 'delete'],
    user_dismiss: ['create', 'read', 'update', 'delete'],
    clients: ['create', 'read', 'update', 'delete'],
    projects: ['create', 'read', 'update', 'delete'],
    objectives: ['create', 'read', 'update', 'delete'],
    key_dates: ['create', 'read', 'update', 'delete'],
    interviews: ['create', 'read', 'update', 'delete'],
    dept_issues: ['create', 'read', 'update', 'delete'],
    departments: ['create', 'read', 'update', 'delete'],
    dept_functions: ['create', 'read', 'update', 'delete'],
    project_dismiss: ['create', 'read', 'update', 'delete']
  },

  team_manager: {
    users: ['create', 'read', 'update'],
    salaries: ['create', 'read', 'update'],
    user_dismiss: ['create', 'read', 'update'],
    clients: ['create', 'read', 'update'],
    projects: ['create', 'read', 'update'],
    objectives: ['create', 'read', 'update'],
    key_dates: ['create', 'read', 'update'],
    interviews: ['create', 'read', 'update'],
    dept_issues: ['create', 'read', 'update'],
    departments: ['create', 'read', 'update'],
    dept_functions: ['create', 'read', 'update'],
    project_dismiss: ['create', 'read', 'update']
  },

  support_agent: {
    users: ['read'],
    clients: ['read', 'update'],
    projects: ['read', 'update'],
    interviews: ['read', 'update'],
    project_dismiss: ['read', 'update'],
    objectives: ['read', 'update']
  },

  client: {
    clients: ['read'],
    projects: ['read'],
    interviews: ['read']
  }
};

module.exports = { CRM_PERMISSIONS };
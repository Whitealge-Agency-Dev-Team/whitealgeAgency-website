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
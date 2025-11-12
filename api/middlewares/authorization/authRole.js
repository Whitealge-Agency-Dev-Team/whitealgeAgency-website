const { CRM_PERMISSIONS } = require("../../models/user/role/CRM_permissions");

const resolveRoleKey = (rawRole) => {
  if (!rawRole) return null;
  const r = String(rawRole).toLowerCase();
  if (r.length === 1) {
    const map = {
      a: 'admin',
      t: 'team_manager',
      c: 'client',
      o: 'owner', // futuro rol Owner si se agrega a CRM_PERMISSIONS
      w: 'support_agent', // worker => support_agent por defecto
    };
    return map[r] || r;
  }
  return r;
};

const authRole = (model, action) => {
  return (req, res, next) => {
    if (!req.user || (!req.user.role && !req.user.roleId)){
      return res.status(401).json({ message: `Acceso denegado, no se ha proporcionado un rol válido`});
    }

    const roleKey = resolveRoleKey(req.user.role);
    const rolePermissions = roleKey && CRM_PERMISSIONS[roleKey];
    
    if (!rolePermissions){
      return res.status(403).json({ message: `Rol inválido o sin permisos configurados`});
    }
    
    const modelActions = rolePermissions[model];

    if (!modelActions) return res.status(403).json({ message: `Tu rol no tiene acceso al módulo: ${model}`});

    const hasPermissions = modelActions.includes(action);
    
    if (hasPermissions) {next();} 
    else {return res.status(403).json({ message: `Acceso denegado, tu rol: ${roleKey} no tiene permisos para ${action} en el módulo: ${model}`});}
  };
};

module.exports = { authRole };

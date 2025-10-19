const { CRM_PERMISSIONS } = require("../../models/user/role/CRM_permissions");

const authRole = (model, action) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role){
      return res.json({status: 401, message: `Acceso denegado, no se ha proporcionado un rol: ${req.user.role}`});
    }

    const userRole = req.user.role;
    const rolePermissions = CRM_PERMISSIONS[userRole];
    
    if (!rolePermissions){
      return res.json({status: 403, message: `Rol inválido o no tiene permisos: ${rolePermissions}`});
    }
    
    const modelActions = rolePermissions[model];

    if (!modelActions) return res.json({status: 403, message: `Tu rol no tiene acceso al modulo: ${model}`});

    const hasPermissions = modelActions.includes(action);
    
    if (hasPermissions) {next();} 
    else {return res.json({status: 403, message: `Acceso denegado, tu rol: ${userRole} no tiene permisos para ${action} en el modelo: ${model}`});}
  };
};

module.exports = { authRole };

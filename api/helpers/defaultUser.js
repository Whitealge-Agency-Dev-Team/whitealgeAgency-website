const { User, Role } = require('../models/index');
const bcrypt = require("bcrypt");

async function defaultUser() {
  try {
    const queryRole = await Role.findOrCreate({
      where: { code: 'A' }, 
      defaults: { code: 'A' } 
    });
    

    if (queryRole) console.log(`Servidor corriendo en: http://localhost:3000`)
    const pass = await bcrypt.hash("1234", 12);

    const queryUser = await User.findOrCreate({
      where: { email: "admin@gmail.com" }, 
      defaults: { 
        email: "admin@gmail.com",
        phoneNumber: "1120731016",
        name: "admin",
        surname: "istrator",
        passwordHash: pass,
        roleId: queryRole.id
      }
    });
  } catch (error) {
    console.error('Error al inicializar datos por defecto:', error);
  }
}

module.exports = { defaultUser };
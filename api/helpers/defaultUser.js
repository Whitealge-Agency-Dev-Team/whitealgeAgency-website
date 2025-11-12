const { User, Role, Status, Project, Objective, KeyDate, Client, Representative } = require('../models/index');
const bcrypt = require("bcrypt");

const sequelize = require("../config/database");

async function ensureClientIndustryColumn() {
  try {
    const qi = sequelize.getQueryInterface();
    const desc = await qi.describeTable('client');
    if (!desc['industry']) {
      await qi.addColumn('client', 'industry', {
        type: require('sequelize').DataTypes.STRING(80),
        allowNull: true,
      });
      console.log('[BOOT] Columna client.industry creada');
    }
  } catch (e) {
    console.warn('[BOOT] No se pudo verificar/crear client.industry:', e?.message);
  }
}

async function defaultUser() {
  try {
    console.log(`Servidor corriendo en: http://localhost:3000`);

    // Asegurar columna industry en client (si falta)
    await ensureClientIndustryColumn();

    // Seed roles (A,O,T,W,C)
    const roleCodes = ['A','O','T','W','C'];
    const roleInstances = {};
    for (const code of roleCodes) {
      const [role] = await Role.findOrCreate({ where: { code }, defaults: { code } });
      roleInstances[code] = role;
    }

    // Seed statuses (en curso, en pausa, finalizado)
    const statusNames = ['en curso', 'en pausa', 'finalizado'];
    for (const name of statusNames) {
      await Status.findOrCreate({ where: { name }, defaults: { name } });
    }

    // Seed admin user (idempotente)
    const adminPass = await bcrypt.hash("1234", 12);
    const [admin] = await User.findOrCreate({
      where: { email: "admin@gmail.com" }, 
      defaults: { 
        email: "admin@gmail.com",
        phoneNumber: "1120731016",
        name: "Admin",
        surname: "Principal",
        passwordHash: adminPass,
        roleId: roleInstances['A'].id,
        isActive: true
      }
    });

    // Demo dataset (usuarios, cliente, proyecto) — idempotente
    const demoPassHash = await bcrypt.hash("Demo1234", 12);

    const [owner] = await User.findOrCreate({
      where: { email: "owner.demo@demo.com" },
      defaults: {
        email: "owner.demo@demo.com",
        phoneNumber: "1100000001",
        name: "Olivia",
        surname: "Owner",
        passwordHash: demoPassHash,
        roleId: roleInstances['O'].id,
        isActive: true
      }
    });

    const [organizer] = await User.findOrCreate({
      where: { email: "organizer.demo@demo.com" },
      defaults: {
        email: "organizer.demo@demo.com",
        phoneNumber: "1100000002",
        name: "Oscar",
        surname: "Organizer",
        passwordHash: demoPassHash,
        roleId: roleInstances['T'].id,
        isActive: true
      }
    });

    const [worker] = await User.findOrCreate({
      where: { email: "worker.demo@demo.com" },
      defaults: {
        email: "worker.demo@demo.com",
        phoneNumber: "1100000003",
        name: "Wendy",
        surname: "Worker",
        passwordHash: demoPassHash,
        roleId: roleInstances['W'].id,
        isActive: true
      }
    });

    // Cliente (lead) + representante
    const statusEnCurso = await Status.findOne({ where: { name: 'en curso' } });

    const [clientLead] = await Client.findOrCreate({
      where: { contactEmail: "cliente.demo@demo.com" },
      defaults: {
        companyName: "Cliente Demo S.A.",
        contactEmail: "cliente.demo@demo.com",
        phone: "1100000004",
        problemDescription: "Quieren implementar un CRM y automatizar reportes",
        industry: "Servicios",
        statusId: statusEnCurso ? statusEnCurso.id : null
      }
    });

    await Representative.findOrCreate({
      where: { clientId: clientLead.id, email: 'rep.demo@demo.com' },
      defaults: {
        clientId: clientLead.id,
        name: 'Carla Representante',
        email: 'rep.demo@demo.com',
        phone: '1100000999',
        position: 'Gerente de Operaciones'
      }
    });

    // Usuario con rol cliente (se crea aparte del lead, para login)
    const [clientUser] = await User.findOrCreate({
      where: { email: "cliente.demo@demo.com" },
      defaults: {
        email: "cliente.demo@demo.com",
        phoneNumber: "1100000004",
        name: "Claudio",
        surname: "Cliente",
        passwordHash: demoPassHash,
        roleId: roleInstances['C'].id,
        isActive: true
      }
    });

    // Proyecto demo
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());

    const [project] = await Project.findOrCreate({
      where: { name: "Implementación CRM Demo" },
      defaults: {
        name: "Implementación CRM Demo",
        description: "Levantamiento, configuración y capacitación básica",
        statusId: statusEnCurso ? statusEnCurso.id : null,
        startDate: start.toISOString().slice(0,10),
        endDate: end.toISOString().slice(0,10),
        budget: 15000
      }
    });

    // Asignar equipo (admin, owner, organizer, worker)
    try {
      await project.setUsers([admin.id, owner.id, organizer.id, worker.id].filter(Boolean));
    } catch (e) {
      console.warn('[SEED] No se pudo asignar equipo al proyecto demo:', e?.message);
    }

    // Objetivo demo
    await Objective.findOrCreate({
      where: { projectId: project.id, description: 'Configurar autenticación y permisos' },
      defaults: {
        projectId: project.id,
        description: 'Configurar autenticación y permisos',
        dueDate: end.toISOString().slice(0,10),
        isCompleted: false,
        priority: 1
      }
    });

    // Fecha clave demo
    await KeyDate.findOrCreate({
      where: { projectId: project.id, title: 'Kickoff con cliente' },
      defaults: {
        projectId: project.id,
        title: 'Kickoff con cliente',
        date: start.toISOString().slice(0,10),
        description: 'Revisión del alcance y plan inicial'
      }
    });

    // Resumen en consola para demo
    console.log('================ DEMO READY ================');
    console.log('Login Frontend:', 'http://localhost:5173/crm/login');
    console.log('Admin  ->', 'admin@gmail.com', '/ 1234');
    console.log('Owner  ->', 'owner.demo@demo.com', '/ Demo1234');
    console.log('Org/T  ->', 'organizer.demo@demo.com', '/ Demo1234');
    console.log('Worker ->', 'worker.demo@demo.com', '/ Demo1234');
    console.log('Client ->', 'cliente.demo@demo.com', '/ Demo1234');
    console.log('Proyecto demo:', '"Implementación CRM Demo" con equipo asignado');
    console.log('============================================');

  } catch (error) {
    console.error('Error al inicializar datos por defecto:', error);
  }
}

module.exports = { defaultUser };
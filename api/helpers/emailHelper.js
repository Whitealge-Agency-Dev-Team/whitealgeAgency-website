const sendInvitationEmail = (email, password) => {
  console.log(`Enviando invitación a ${email} con contraseña: ${password}`);
};

const sendClientInvitation = (client) => {
  console.log(`Enviando invitación a cliente: ${client.companyName}`);
};

const generateTempPassword = () => {
  return Math.random().toString(36).slice(-8);
};
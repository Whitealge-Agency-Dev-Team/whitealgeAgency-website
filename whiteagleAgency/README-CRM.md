# WhitEagle — CRM (Frontend unificado)

Este frontend unifica el sitio público y el CRM bajo un único proyecto Vite/React con MUI.

## Requisitos
- Node.js 18+

## Variables de entorno (Vite)
Cree un archivo `.env` en `whiteagleAgency/` con:

```
VITE_API_BASE_URL=http://localhost:3000
```

## Instalar y ejecutar
```
cd whiteagleAgency
npm i
npm run dev
```
Abrir http://localhost:5173

## Rutas principales
- Sitio público
  - `/` Home (botones a Login y Formulario de consulta)
  - `/contacto` Formulario público → POST `/clients/public-form`
- CRM
  - `/crm/login` Login
  - `/crm/set-password?token=...` Establecer contraseña tras invitación
  - Protegidas (requieren token):
    - `/crm/home` Inicio CRM
    - `/crm/profile` Perfil y Seguridad
    - `/crm/clientes` Listado de clientes
    - `/crm/clientes/:id` Detalle de cliente (datos, estado, representantes, proyectos)
    - `/crm/proyectos` Listado de proyectos
    - `/crm/proyectos/:id` Detalle de proyecto (datos, equipo, objetivos, fechas clave)
    - `/crm/invitar` Invitar trabajador (roles: A/O/T)

## Roles
Los roles están definidos por código de 1 letra en el backend:
- A: Admin
- O: Owner (mismos permisos que Admin por ahora)
- T: Organizer (Team Manager)
- W: Worker (Support Agent)
- C: Client

El guard de rutas usa el código (`A/O/T/W/C`) expuesto por `/auth/me`.

## Flujo de acceso
- Lead: el usuario completa `/contacto`. Un organizador revisa y cambia el estado del cliente. Al aceptar (estado "en curso"), se usa "Registrar cliente" (en Detalle del Cliente) que dispara `POST /auth/register-client` y el servidor imprime en consola un link de `set-password`.
- Invitación de trabajador: desde `/crm/invitar` (A/O/T) se envía `POST /auth/invite-worker`; el backend imprime en consola el link de `set-password`.

## Notas
- Todos los formularios exigen completar todos los campos.
- La URL base del backend se toma de `VITE_API_BASE_URL`.
- Tablas usan MUI DataGrid con filtros; el estado se carga de `GET /status`.

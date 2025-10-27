import './login.css'

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-header">Inicio de sesion</h2>

        <form className="login-form">
          <div className="field">
            <label htmlFor="email">Correo</label>
            <input type="email" id="email" placeholder="tucorreo@ejemplo.com" required />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  )
}

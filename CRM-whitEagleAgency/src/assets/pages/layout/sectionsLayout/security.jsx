export default function Security(){
    return (
    <>
    <div className="content-section">
        <div className='content-information'>
        <p>Recuperar contraseña</p>
        <label htmlFor="email">Correo electrónico</label>
        <input type="text" disabled name="email" id="email" value={"Lorem@gmail.com"}/>
        <button id="pass">Cambiar contraseña</button>
        </div>
    </div>
    </>
    );
}
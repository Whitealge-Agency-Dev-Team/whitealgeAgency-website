import './sectionLayout.css'

export default function Profile() {
  return (
      <div className="content-section">
        <div className='content-information'>
          <label htmlFor="name">Nombre</label>
          <input type="text" defaultValue={'lorem'} name="name" id="name"/>
          <label htmlFor="surname">Apellido</label>
          <input type="text" defaultValue={'ipsum'} name="surname" id="surname"/>
          <label htmlFor="phone">Número de teléfono</label>
          <input type="number" defaultValue={1135231122} name="phone" id="phone"/>
          <label htmlFor="img">Email</label>
          <input type="email" defaultValue={'Lorem@gmail.com'} name="email" id="email"/>
          <label htmlFor="img">Imagen de perfil</label>
          <input type="image" name="img" id="img"/>
        </div>
      </div> 
  )
}

import bg_image from '../../../images/backgroundWelcome.jpg'
export default function HomeSection() {
  return (
    <section >
      <h1 className="title">Somos WhitEagle</h1>
      <div className="description">
        <p>La mejor alternativa para tus proyectos</p>
        <img src={bg_image} alt="background-image" className="image"/>
      </div>
    </section>
  );
}

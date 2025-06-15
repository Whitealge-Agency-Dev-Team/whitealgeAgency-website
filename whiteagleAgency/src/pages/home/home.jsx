import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import home from "./home.module.css";
import image from "../../../public/images/logo.svg";
import Staff from "../../components/staffCard/Staff";

export default function Home() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("../../../JSON/staff.json");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };
    fetchStaff();
  }, []);
  return (
    <>
      <div className={home.welcome}>
        <div className={home.welcomeInfo}>
          <h1 className={home.welcomeTitle}>Somos WhitEagle</h1>
          <p className={home.welcomeSubtitle}>
            La mejor alternativa para tu crecimieto
          </p>
        </div>
      </div>
      <section className={home.section}>
        <h1 className={home.sectionTitle}>¿Quiénes somos?</h1>
        <div className={home.sectionInfo}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quod
            molestiae nisi, libero ad, laborum aut voluptatum impedit sequi, nam
            qui illo. Esse numquam, quaerat maxime recusandae repellat velit
            dolorum!
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum fuga
            quam quasi aperiam repellat repudiandae in, rem officia
            necessitatibus consectetur. Eaque earum sapiente sed sequi modi enim
            vel non laboriosam! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Saepe quo nihil sed facilis, nostrum veniam
            voluptatem deleniti. Laborum, magni excepturi provident qui id nihil
            temporibus reprehenderit eligendi, tempore cum quidem. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aspernatur placeat
            architecto natus aperiam ducimus consequuntur hic soluta provident
            fugiat dicta, minus fuga molestias quo et sunt optio illum officia
            qui! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            dolore similique nostrum tempora incidunt vero aliquam, illum culpa
            atque est ipsam, vel non commodi eligendi. Facilis modi aliquid
            sapiente veritatis.
          </p>
          <img src={image} alt="Imagen" className={home.image} />
        </div>
      </section>
      <section className={home.section}>
        <h1 className={home.sectionTitle}>Servicios y compromiso</h1>
        <div className={home.sectionInfo}>
          <img src={image} alt="Imagen" className={home.image} />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quod
            molestiae nisi, libero ad, laborum aut voluptatum impedit sequi, nam
            qui illo. Esse numquam, quaerat maxime recusandae repellat velit
            dolorum!
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum fuga
            quam quasi aperiam repellat repudiandae in, rem officia
            necessitatibus consectetur. Eaque earum sapiente sed sequi modi enim
            vel non laboriosam! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Saepe quo nihil sed facilis, nostrum veniam
            voluptatem deleniti. Laborum, magni excepturi provident qui id nihil
            temporibus reprehenderit eligendi, tempore cum quidem. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aspernatur placeat
            architecto natus aperiam ducimus consequuntur hic soluta provident
            fugiat dicta, minus fuga molestias quo et sunt optio illum officia
            qui! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            dolore similique nostrum tempora incidunt vero aliquam, illum culpa
            atque est ipsam, vel non commodi eligendi. Facilis modi aliquid
            sapiente veritatis.
          </p>
        </div>
      </section>
      <div>
        <h1 className={home.sectionTitle}>Nuestro Staff</h1>
        <div className={home.staffContainer}>
          {staff.map((member, index) => (
            <Staff
              key={index}
              name={member.name}
              assets={member.assets}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}

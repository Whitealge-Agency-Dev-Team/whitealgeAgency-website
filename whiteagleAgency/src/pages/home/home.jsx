import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import home from "./home.module.css"

export default function Home() {

    return (
        <>
            <div className={home.welcome}>
                <div>
                    <h1 className={home.welcomeTitle}>Somos WhitEagle</h1>
                    <p>La mejor alternativa para tu crecimieto</p>
                </div>
            </div>
            <section>
                <h1>¿Quiénes somos?</h1>
                <img src="#" alt="Imagen" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quod molestiae nisi, libero ad, laborum aut voluptatum impedit sequi, nam qui illo. Esse numquam, quaerat maxime recusandae repellat velit dolorum!
                    <br />
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum fuga quam quasi aperiam repellat repudiandae in, rem officia necessitatibus consectetur. Eaque earum sapiente sed sequi modi enim vel non laboriosam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quo nihil sed facilis, nostrum veniam voluptatem deleniti. Laborum, magni excepturi provident qui id nihil temporibus reprehenderit eligendi, tempore cum quidem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur placeat architecto natus aperiam ducimus consequuntur hic soluta provident fugiat dicta, minus fuga molestias quo et sunt optio illum officia qui!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore similique nostrum tempora incidunt vero aliquam, illum culpa atque est ipsam, vel non commodi eligendi. Facilis modi aliquid sapiente veritatis.
                </p>
            </section>
                        <section>
                <h1>Servicios y compromiso</h1>
                <img src="#" alt="Imagen" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quod molestiae nisi, libero ad, laborum aut voluptatum impedit sequi, nam qui illo. Esse numquam, quaerat maxime recusandae repellat velit dolorum!
                    <br />
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum fuga quam quasi aperiam repellat repudiandae in, rem officia necessitatibus consectetur. Eaque earum sapiente sed sequi modi enim vel non laboriosam!
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quo nihil sed facilis, nostrum veniam voluptatem deleniti. Laborum, magni excepturi provident qui id nihil temporibus reprehenderit eligendi, tempore cum quidem.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur placeat architecto natus aperiam ducimus consequuntur hic soluta provident fugiat dicta, minus fuga molestias quo et sunt optio illum officia qui!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, dolore similique nostrum tempora incidunt vero aliquam, illum culpa atque est ipsam, vel non commodi eligendi. Facilis modi aliquid sapiente veritatis.
                </p>
            </section>
            <div>
                <h1>Nuestro Staff</h1>
            </div>
        </>
    )
}
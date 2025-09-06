import React from "react";
import styles from "./Services.module.css";

export default function Services() {
  const services = [
    {
      title: "Desarrollo de planes de negocio",
      desc: "Creamos planes claros y efectivos para guiar el crecimiento de tu empresa.",
    },
    {
      title: "Análisis de competencia",
      desc: "Estudiamos el mercado y la competencia para darte ventaja estratégica.",
    },
    {
      title: "Diseño de estrategias de crecimiento",
      desc: "Definimos caminos sólidos para expandir tus operaciones de forma sostenible.",
    },
    {
      title: "Reestructuración organizacional",
      desc: "Optimizamos la estructura de tu empresa para mejorar eficiencia y comunicación.",
    },
    {
      title: "Optimización de procesos internos",
      desc: "Detectamos y mejoramos procesos para reducir costos y aumentar productividad.",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Servicios</h1>
      <p className={styles.subtitle}>
        En WhitEagle ofrecemos soluciones adaptadas a tus necesidades: desde
        detectar problemas en sistemas hasta reuniones periódicas para medir
        avances y resultados.
      </p>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <div key={index} className={styles.card}>
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

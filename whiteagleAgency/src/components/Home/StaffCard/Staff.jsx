import staff from "./staff.module.css";

export default function Staff({ name, assets, image }) {
  return (
    <div className={staff.card}>
      <div className={staff.header}>
        <img src={image} alt={name} className={staff.image} />
        <p className={staff.name}>{name}</p>
      </div>
      <ul className={staff.assets}>
        {assets.map((asset, index) => (
          <li key={index}>{asset}</li>
        ))}
      </ul>
    </div>
  );
}

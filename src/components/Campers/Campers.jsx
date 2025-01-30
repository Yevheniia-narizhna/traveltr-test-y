import s from "./Campers.module.css";

const Campers = ({
  id,
  name,
  price,
  gallery,
  rating,
  location,
  features = [],
  onClick,
}) => {
  return (
    <div>
      <img className={s.image} src={gallery[0]?.thumb} alt={`Camper ${name}`} />
      <h2>Campers {name}</h2>
      <p>{price ? price.toFixed(2) : "0.00"} €</p>
      <p>{rating}</p>
      <p>{location}</p>
      <p>The pictures shown here are example vehicles of the respective...</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button onClick={() => onClick(id)}>Show more </button>
    </div>
  );
};
export default Campers;

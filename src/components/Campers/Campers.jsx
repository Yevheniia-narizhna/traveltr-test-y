import { useEffect, useRef, useState } from "react";
import s from "./Campers.module.css";

const Campers = ({
  id,
  name,
  price,
  description,
  gallery,
  rating,
  location,
  features = [],
  onClick,
}) => {
  const swapLocation = (location) => {
    const parts = location.split(", ");
    if (parts.length === 2) {
      return `${parts[1]}, ${parts[0]}`;
    }
    return location;
  };

  const swappedLocation = swapLocation(location);

  const maxWidth = 525;

  const TruncateText = ({ text, maxWidth }) => {
    const containerRef = useRef(null);
    const [truncated, setTruncated] = useState(text);

    useEffect(() => {
      if (!containerRef.current) return;

      const context = document.createElement("canvas").getContext("2d");
      context.font = getComputedStyle(containerRef.current).font;

      let words = text.split(" ");
      let result = words[0];

      for (let i = 1; i < words.length; i++) {
        if (
          context.measureText(result + " " + words[i] + "...").width > maxWidth
        )
          break;
        result += " " + words[i];
      }

      setTruncated(result + "...");
    }, [text, maxWidth]);

    return (
      <p ref={containerRef} style={{ maxWidth, overflow: "hidden" }}>
        {truncated}
      </p>
    );
  };

  return (
    <div className={s.contCamper}>
      <div>
        <img
          className={s.image}
          src={gallery[0]?.thumb}
          alt={`Camper ${name}`}
        />
      </div>
      <div className={s.contCamperText}>
        <div className={s.contNamePrice}>
          <h2 className={s.name}>Campers {name}</h2>
          <div className={s.miniCont}>
            <p className={s.price}>{price ? price.toFixed(2) : "0.00"} €</p>
            <svg className={s.iconFav}>
              <use href="sprite.svg#icon-Property-1Default"></use>
            </svg>
          </div>
        </div>
        <p>{rating}</p>
        <p>
          <svg className={s.icon}>
            <use href="sprite.svg#icon-Map"></use>
          </svg>
          {swappedLocation}
        </p>
        <TruncateText text={description} maxWidth={maxWidth} />
        <ul>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <button className={s.btnShow} onClick={() => onClick(id)}>
          Show more{" "}
        </button>
      </div>
    </div>
  );
};
export default Campers;

import { useLayoutEffect, useRef, useState } from "react";
import s from "./Campers.module.css";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import FilterIcons from "../FilterIcons/FilterIcons";
import { selectFilters } from "../../redux/campers/selectors";

import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorites/slice";

const Campers = ({
  id,
  name,
  price,
  description,
  gallery,
  rating,
  location,
  reviewsCount,
}) => {
  // console.log(id);
  const filters = useSelector(selectFilters);
  const favorites = useSelector((state) => state.favorites.list);
  const dispatch = useDispatch();

  // Перевіряємо, чи кемпер є у списку обраних
  const isFavorite = favorites.some((camper) => camper.id === id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(
        addToFavorites({
          id,
          name,
          price,
          description,
          gallery,
          rating,
          location,
          reviewsCount,
        })
      );
    }
  };

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

    // Використовуємо useLayoutEffect замість useEffect, щоб обчислення відбулося після рендеру
    useLayoutEffect(() => {
      if (!containerRef.current) return;

      const context = document.createElement("canvas").getContext("2d");
      context.font = getComputedStyle(containerRef.current).font;

      let words = text.split(" ");
      let result = words[0];

      // Перевіряємо, скільки слів вміщується в maxWidth
      for (let i = 1; i < words.length; i++) {
        if (
          context.measureText(result + " " + words[i] + "...").width > maxWidth
        ) {
          break;
        }
        result += " " + words[i];
      }

      // Обрізаємо текст і додаємо '...'
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
            <p className={s.price}>€{price ? price.toFixed(2) : "0.00"}</p>
            <button className={s.btnFav}>
              <svg
                className={`${s.iconFav} ${isFavorite ? s.favSelected : ""}`} // Зміна класу для вибраних кемперів
                onClick={toggleFavorite} // Тепер при натисканні викликається toggleFavorite
              >
                <use href="sprite.svg#icon-Property-1Default"></use>
              </svg>
            </button>
          </div>
        </div>
        <div className={s.ratingLocation}>
          <div className={s.rating}>
            <svg className={s.iconStar}>
              <use href="sprite.svg#icon-Property-1Pressed"></use>
            </svg>
            {rating} ({reviewsCount} Reviews)
          </div>
          <div className={s.location}>
            <svg className={s.icon}>
              <use href="sprite.svg#icon-Map"></use>
            </svg>
            {swappedLocation}
          </div>
        </div>
        <div className={s.contPiconsBtn}>
          <TruncateText text={description} maxWidth={maxWidth} />
          <div className={s.filtIcon}>
            <FilterIcons filters={filters} limit={4} />
          </div>

          <Link to={`/catalog/${id}`}>
            <button className={s.btnShow}>Show more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Campers;

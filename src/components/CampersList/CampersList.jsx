import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, fetchCampersById } from "../../redux/campers/operations";
import { useEffect } from "react";
import Campers from "../Campers/Campers";
import s from "./CampersList.module.css";

const CampersList = () => {
  const { campers, filters } = useSelector((state) => state.campers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const isFiltering =
    filters.AC ||
    filters.kitchen ||
    filters.TV ||
    filters.bathroom ||
    filters.transmission ||
    filters.form ||
    filters.location;

  //   const selectedFeatures = Object.entries(filters.features)
  //     .filter(([_, value]) => value)
  //     .map(([key]) => key);

  //   console.log("Selected Features:", selectedFeatures);

  const filteredCampers = isFiltering
    ? campers.filter((camper) => {
        // Перевірка кожної властивості в фільтрах
        if (filters.location && !camper.location.includes(filters.location)) {
          return false; // Якщо локація не співпадає, пропускаємо цей кемпер
        }
        if (filters.form && camper.form !== filters.form) {
          return false; // Якщо форма не співпадає, пропускаємо цей кемпер
        }
        if (filters.AC && camper.AC !== filters.AC) {
          return false; // Якщо AC не співпадає, пропускаємо цей кемпер
        }
        if (filters.bathroom && camper.bathroom !== filters.bathroom) {
          return false; // Якщо bathroom не співпадає, пропускаємо цей кемпер
        }
        if (filters.kitchen && camper.kitchen !== filters.kitchen) {
          return false; // Якщо kitchen не співпадає, пропускаємо цей кемпер
        }
        if (filters.TV && camper.TV !== filters.TV) {
          return false; // Якщо TV не співпадає, пропускаємо цей кемпер
        }
        if (
          filters.transmission &&
          camper.transmission !== filters.transmission
        ) {
          return false; // Якщо transmission не співпадає, пропускаємо цей кемпер
        }
        return true; // Якщо всі фільтри пройдені, включаємо цей кемпер
      })
    : campers;

  console.log("Filtered campers:", filteredCampers);

  return (
    <div>
      <div>
        <ul className={s.campertlist}>
          {filteredCampers.map((camper) => (
            <li key={camper.id}>
              <Campers
                name={camper.name}
                price={camper.price}
                gallery={camper.gallery}
                rating={camper.rating}
                location={camper.location}
                features={camper.features}
                onClick={() => dispatch(fetchCampersById(camper.id))}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampersList;

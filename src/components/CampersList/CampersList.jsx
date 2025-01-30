import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, fetchCampersById } from "../../redux/campers/operations";
import { useEffect } from "react";
import Campers from "../Campers/Campers";
import s from "./CampersList.module.css";

const CampersList = () => {
  const { campers } = useSelector((state) => state.campers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  console.log("Campers from API:", campers);

  return (
    <div>
      <div>
        <ul className={s.campertlist}>
          {campers.map((camper) => (
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

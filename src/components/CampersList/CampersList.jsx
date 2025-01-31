import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
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
                id={camper.id}
                name={camper.name}
                price={camper.price}
                gallery={camper.gallery}
                rating={camper.rating}
                description={camper.description}
                location={camper.location}
                reviewsCount={camper.reviews ? camper.reviews.length : 0}
                // features={camper.features}
                // onClick={() => dispatch(fetchCampersById(camper.id))}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampersList;

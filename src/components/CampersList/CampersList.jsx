import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { useEffect } from "react";
import Campers from "../Campers/Campers";
import s from "./CampersList.module.css";
import { resetCampers } from "../../redux/campers/slice";
import Loader from "../Loader/Loader";

const CampersList = () => {
  const { campers, total, currentPage, loading, filters } = useSelector(
    (state) => state.campers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCampers()); // Скидаємо стан при першому завантаженні
    dispatch(fetchCampers({ page: 1, limit: 4 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchCampers({ page: currentPage + 1, limit: 4, filters }));
  };

  // console.log("Campers from API:", campers);

  return (
    <div>
      {loading && campers.length === 0 ? (
        <Loader />
      ) : (
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
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {campers.length < total &&
        (loading ? (
          <Loader />
        ) : (
          <button className={s.btnLoadMore} onClick={handleLoadMore}>
            Load More
          </button>
        ))}
    </div>
  );
};

export default CampersList;

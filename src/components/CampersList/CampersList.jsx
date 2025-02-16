import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { useEffect, useState } from "react";
import Campers from "../Campers/Campers";
import s from "./CampersList.module.css";
import { resetCampers } from "../../redux/campers/slice";
import Loader from "../Loader/Loader";

const CampersList = () => {
  const { campers, total, currentPage, loading, filters } = useSelector(
    (state) => state.campers
  );

  const favorites = useSelector((state) => state.favorites.list);
  const dispatch = useDispatch();

  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (!showFavorites) {
      dispatch(resetCampers()); // Скидаємо стан при перемиканні на "всі кемпери"
      dispatch(fetchCampers({ page: 1, limit: 4 }));
    }
  }, [dispatch, showFavorites]);

  const handleLoadMore = () => {
    dispatch(fetchCampers({ page: currentPage + 1, limit: 4, filters }));
  };

  const displayedCampers = showFavorites ? favorites : campers;

  return (
    <div>
      <button
        className={s.toggleButton}
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "Show All Campers" : "Show Favorites"}
      </button>

      {loading && displayedCampers.length === 0 ? (
        <Loader />
      ) : (
        <ul className={s.campertlist}>
          {displayedCampers.map((camper) => (
            <li key={camper.id}>
              <Campers {...camper} />
            </li>
          ))}
        </ul>
      )}

      {!showFavorites && campers.length < total && !loading && (
        <button className={s.btnLoadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {showFavorites && favorites.length === 0 && (
        <p>No favorite campers yet.</p>
      )}
    </div>
  );
};

export default CampersList;

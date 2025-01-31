import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { fetchCampersById } from "../../redux/campers/operations.js";
import s from "./DetailsCamper.module.css";

const DetailsCamper = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const oneCamper = useSelector((state) => state.campers.oneCamper);

  useEffect(() => {
    dispatch(fetchCampersById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(oneCamper);
  }, [oneCamper]);

  if (!oneCamper) {
    return <div>Camper not found</div>;
  }

  return (
    <div className={s.contDetail}>
      <p>{oneCamper.name}</p>
      <ul>
        <li>
          <Link to="features">Features</Link>
        </li>

        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
export default DetailsCamper;

import { useDispatch, useSelector } from "react-redux";
import FilterIcons from "../FilterIcons/FilterIcons.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCampersById } from "../../redux/campers/operations.js";
import s from "./FeaturesById.module.css";

const FeaturesById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const oneCamper = useSelector((state) => state.campers.oneCamper);

  useEffect(() => {
    dispatch(fetchCampersById(id));
  }, [dispatch, id]);

  const filters = useSelector((state) => state.campers.filters);

  const vehicleDetails = [
    { label: "Form", value: oneCamper.form },
    { label: "Length", value: oneCamper.length },
    { label: "Width", value: oneCamper.width },
    { label: "Height", value: oneCamper.height },
    { label: "Tank Capacity", value: oneCamper.tank },
    { label: "Fuel Consumption", value: oneCamper.consumption },
  ];

  return (
    <div className={s.contFeatById}>
      <div>
        <FilterIcons filters={filters} />
      </div>
      <div className={s.vehicle}>
        <h2>Vehicle details</h2>
        <ul>
          {vehicleDetails.map((detail, index) => (
            <li key={index}>
              <div className={s.vehicleValue}>
                <p>{detail.label}</p>
                <p>{detail.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default FeaturesById;

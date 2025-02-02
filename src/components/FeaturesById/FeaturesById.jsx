import { useDispatch, useSelector } from "react-redux";
import FilterIcons from "../FilterIcons/FilterIcons.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchCampersById } from "../../redux/campers/operations.js";
import s from "./FeaturesById.module.css";
import { selectFilters } from "../../redux/campers/selectors.js";

const FeaturesById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const oneCamper = useSelector((state) => state.campers.oneCamper);

  useEffect(() => {
    dispatch(fetchCampersById(id));
  }, [dispatch, id]);

  const filters = useSelector(selectFilters);

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
      <div className={s.filterIc}>
        <FilterIcons filters={filters} />
      </div>
      <div className={s.vehicle}>
        <h2 className={s.vehicleTitle}>Vehicle details</h2>
        <ul>
          {vehicleDetails.map((detail, index) => (
            <li key={index}>
              <div className={s.vehicleValue}>
                <p>{detail.label}</p>
                <p>{detail.value.replace(/(\d+)([a-zA-Z]+)/, "$1 $2")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default FeaturesById;

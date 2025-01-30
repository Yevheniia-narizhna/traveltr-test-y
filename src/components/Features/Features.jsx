import { useDispatch, useSelector } from "react-redux";
import s from "./Features.module.css";
import { setFilter } from "../../redux/campers/slice.js";
import { fetchCampers } from "../../redux/campers/operations.js";

const Features = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.campers.filters);

  const handleFeatureChange = (featureName, featureValue) => {
    dispatch(
      setFilter({
        name: featureName,
        value: featureValue,
      })
    );
  };

  const handleFormChange = (formValue) => {
    dispatch(setFilter({ name: "form", value: formValue }));
  };

  const handleLocationChange = (e) => {
    dispatch(setFilter({ name: "location", value: e.target.value }));
  };

  const searchCamp = () => {
    console.log("Current filters:", filters);
    dispatch(fetchCampers(filters));
  };

  return (
    <div>
      <div>
        <label className={s.label}>Location</label>
        <div className={s.inputWrapp}>
          <svg className={s.icon}>
            <use href="sprite.svg#icon-Map"></use>
          </svg>
          <input
            type="text"
            placeholder="City"
            className={s.input}
            value={filters.location || ""}
            onChange={handleLocationChange}
          />
        </div>
      </div>
      <div>
        <p>Filters</p>
        <h2>Vehicle equipment</h2>
        <div>
          <label>
            <input
              type="checkbox"
              name="AC"
              checked={filters.AC || false}
              onChange={(e) => handleFeatureChange("AC", e.target.checked)}
            />
            AC
          </label>
          <label>
            <input
              type="radio"
              name="transmission"
              value="automatic"
              checked={filters.transmission === "automatic"}
              onChange={() => handleFeatureChange("transmission", "automatic")}
            />
            Automatic
          </label>
          <label>
            <input
              type="checkbox"
              name="kitchen"
              checked={filters.kitchen || false}
              onChange={(e) => handleFeatureChange("kitchen", e.target.checked)}
            />
            Kitchen
          </label>
          <label>
            <input
              type="checkbox"
              name="TV"
              checked={filters.TV || false}
              onChange={(e) => handleFeatureChange("TV", e.target.checked)}
            />
            TV
          </label>
          <label>
            <input
              type="checkbox"
              name="bathroom"
              checked={filters.bathroom || false}
              onChange={(e) =>
                handleFeatureChange("bathroom", e.target.checked)
              }
            />
            Bathroom
          </label>
        </div>
      </div>
      <div>
        <h2>Vehicle type</h2>
        <label>
          <input
            type="radio"
            name="form"
            value="van"
            checked={filters.form === "van"}
            onChange={(e) => handleFormChange(e.target.value)}
          />
          Van
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="fullyIntegrated"
            checked={filters.form === "fullyIntegrated"}
            onChange={(e) => handleFormChange(e.target.value)}
          />
          Fully Integrated
        </label>
        <label>
          <input
            type="radio"
            name="form"
            value="alcove"
            checked={filters.form === "alcove"}
            onChange={(e) => handleFormChange(e.target.value)}
          />
          Alcove
        </label>
      </div>
      <button onClick={searchCamp}>Search</button>
    </div>
  );
};

export default Features;

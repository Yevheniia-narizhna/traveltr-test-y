import { useDispatch, useSelector } from "react-redux";
import s from "./Features.module.css";
import { resetCampers, setFilter } from "../../redux/campers/slice.js";
import { fetchCampers } from "../../redux/campers/operations.js";
import { selectFilters } from "../../redux/campers/selectors.js";
import { useEffect, useState } from "react";

const Features = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const total = useSelector((state) => state.campers.total); // Загальна кількість знайдених кемперів
  const loading = useSelector((state) => state.campers.loading);
  const [noResults, setNoResults] = useState(false);

  const handleFeatureChange = (featureName, featureValue) => {
    if (featureName === "transmission") {
      dispatch(
        setFilter({ name: featureName, value: featureValue ? "automatic" : "" })
      );
    } else {
      dispatch(setFilter({ name: featureName, value: featureValue }));
    }
  };

  const handleFormChange = (formValue) => {
    dispatch(setFilter({ name: "form", value: formValue }));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    console.log("Location input changed:", value);
    dispatch(setFilter({ name: "location", value }));
  };

  const searchCamp = () => {
    dispatch(resetCampers());
    const updatedFilters = { ...filters, page: 1, limit: 4 }; // Починаємо з першої сторінки
    console.log("Applying filters:", updatedFilters);
    dispatch(fetchCampers(updatedFilters));
  };
  useEffect(() => {
    if (!loading && total === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [total, loading]);

  return (
    <div className={s.featureCont}>
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
        <h3 className={s.title}>Filters</h3>
        <h2 className={s.equipmentTitle}>Vehicle equipment</h2>
        <div className={s.filterWrap}>
          {[
            { name: "AC", label: "AC", icon: "icon-wind" },

            {
              name: "transmission",
              label: "Automatic",
              icon: "icon-diagram",
            },
            { name: "kitchen", label: "Kitchen", icon: "icon-cup-hot" },
            { name: "TV", label: "TV", icon: "icon-tv" },
            { name: "bathroom", label: "Bathroom", icon: "icon-ph_shower" },
          ].map((filter) => (
            <div
              key={filter.name}
              className={`${s.filterBox} ${
                filters[filter.name] ? s.selected : ""
              }`}
              onClick={() =>
                handleFeatureChange(filter.name, !filters[filter.name])
              }
            >
              <svg className={s.iconFiltr}>
                <use href={`sprite.svg#${filter.icon}`}></use>
              </svg>
              <label className={s.labelFiltr}>{filter.label}</label>

              {filter.name === "transmission" ? (
                <input
                  type="radio"
                  name="transmission"
                  value="automatic"
                  checked={filters.transmission === "automatic"}
                  onChange={() =>
                    handleFeatureChange("transmission", "automatic")
                  }
                  style={{ display: "none" }}
                />
              ) : (
                <input
                  type="checkbox"
                  name={filter.name}
                  checked={filters[filter.name] || false}
                  onChange={(e) =>
                    handleFeatureChange(filter.name, e.target.checked)
                  }
                  style={{ display: "none" }}
                />
              )}
            </div>
          ))}
        </div>

        <h2 className={s.typeTitle}>Vehicle Type</h2>
        <div className={s.filterGroup}>
          {[
            { value: "panelTruck", label: "Van", icon: "icon-bi_grid-1x2" },
            {
              value: "fullyIntegrated",
              label: "Fully Integrated",
              icon: "icon-bi_grid",
            },
            { value: "alcove", label: "Alcove", icon: "icon-bi_grid-3x3-gap" },
          ].map((type) => (
            <div
              key={type.value}
              className={`${s.filterBox} ${
                filters.form === type.value ? s.selected : ""
              }`}
              onClick={() => handleFormChange(type.value)}
            >
              <svg className={s.iconFiltr}>
                <use href={`sprite.svg#${type.icon}`}></use>
              </svg>
              <label className={s.labelFiltr}>{type.label}</label>
            </div>
          ))}
        </div>
      </div>

      <button className={s.searchButton} onClick={searchCamp}>
        Search
      </button>

      {noResults && !loading && (
        <p className={s.noResults}>No campers found for this filter</p>
      )}
    </div>
  );
};

export default Features;

{
  /* //  return (
//     <div>
//       <div>
//         <label className={s.label}>Location</label>
//         <div className={s.inputWrapp}>
//           <svg className={s.icon}>
//             <use href="sprite.svg#icon-Map"></use>
//           </svg>
//           <input
//             type="text"
//             placeholder="City"
//             className={s.input}
//             value={filters.location || ""}
//             onChange={handleLocationChange}
//           />
//         </div>
//       </div>
//       <div>
//         <p>Filters</p>
//         <h2>Vehicle equipment</h2>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               name="AC"
//               checked={filters.AC || false}
//               onChange={(e) => handleFeatureChange("AC", e.target.checked)}
//             />
//             AC
//           </label>
//           <label>
//             <input
//               type="radio"
//               name="transmission"
//               value="automatic"
//               checked={filters.transmission === "automatic"}
//               onChange={() => handleFeatureChange("transmission", "automatic")}
//             />
//             Automatic
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="kitchen"
//               checked={filters.kitchen || false}
//               onChange={(e) => handleFeatureChange("kitchen", e.target.checked)}
//             />
//             Kitchen
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="TV"
//               checked={filters.TV || false}
//               onChange={(e) => handleFeatureChange("TV", e.target.checked)}
//             />
//             TV
//           </label>
//           <label>
//             <input
//               type="checkbox"
//               name="bathroom"
//               checked={filters.bathroom || false}
//               onChange={(e) =>
//                 handleFeatureChange("bathroom", e.target.checked)
//               }
//             />
//             Bathroom
//           </label>
//         </div>
//       </div>
//       <div>
//         <h2>Vehicle type</h2>
//         <label>
//           <input
//             type="radio"
//             name="form"
//             value="van"
//             checked={filters.form === "van"}
//             onChange={(e) => handleFormChange(e.target.value)}
//           />
//           Van
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="form"
//             value="fullyIntegrated"
//             checked={filters.form === "fullyIntegrated"}
//             onChange={(e) => handleFormChange(e.target.value)}
//           />
//           Fully Integrated
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="form"
//             value="alcove"
//             checked={filters.form === "alcove"}
//             onChange={(e) => handleFormChange(e.target.value)}
//           />
//           Alcove
//         </label>
//       </div>
//       <button onClick={searchCamp}>Search</button>
//     </div>
//   );
// }; */
}

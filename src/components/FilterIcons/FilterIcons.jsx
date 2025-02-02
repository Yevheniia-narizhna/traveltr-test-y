import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/campers/slice";
import s from "./FilterIcons.module.css";
import { allFilters } from "../../utils/filtersIconsConfig";

const FilterIcons = ({ filters, limit = null }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ name: filterName, value }));
  };

  const filtersToRender = limit ? allFilters.slice(0, limit) : allFilters;

  return (
    <div className={s.filterGroupF}>
      {filtersToRender.map((filter) => (
        <div
          key={filter.name}
          className={`${s.filterBoxF} ${
            filters[filter.name] ? s.selectedF : ""
          }`}
          onClick={() => handleFilterChange(filter.name, !filters[filter.name])}
        >
          <svg
            className={`${s.iconF} ${
              ["gas", "microwave", "water"].includes(filter.name)
                ? s.whiteFilStr
                : ""
            }`}
          >
            <use href={`/sprite.svg#${filter.icon}`}></use>
          </svg>
          <label>{filter.label}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterIcons;

import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/campers/slice";
import s from "./FilterIcons.module.css";

const FilterIcons = ({ filters }) => {
  const dispatch = useDispatch();

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilter({ name: filterName, value }));
  };

  const allFilters = [
    {
      name: "transmission",
      label: "Automatic",
      icon: "icon-diagram",
      value: filters.transmission,
    },
    { name: "AC", label: "AC", icon: "icon-wind", value: filters.AC },
    {
      name: "gas",
      label: "Gas",
      icon: "icon-hugeicons_gas-stove",
      value: filters.gas,
    },
    {
      name: "bathroom",
      label: "Bathroom",
      icon: "icon-ph_shower",
      value: filters.bathroom,
    },
    {
      name: "kitchen",
      label: "Kitchen",
      icon: "icon-cup-hot",
      value: filters.kitchen,
    },
    {
      name: "microwave",
      label: "Microwave",
      icon: "icon-lucide_microwave",
      value: filters.microwave,
    },
    {
      name: "water",
      label: "Water",
      icon: "icon-ion_water-outline",
      value: filters.water,
    },
    {
      name: "engine",
      label: "Engine",
      icon: "icon-fuel-pump",
      value: filters.engine,
    },
    {
      name: "refrigerator",
      label: "Refrigerator",
      icon: "icon-solar_fridge-outline",
      value: filters.refrigerator,
    },
    {
      name: "radio",
      label: "Radio",
      icon: "icon-ui-radios",
      value: filters.radio,
    },
  ];

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // swap elements
    }
    return shuffledArray;
  };

  const randomFilters = shuffleArray(allFilters).slice(0, 4);

  return (
    <div className={s.filterGroupF}>
      {randomFilters.map((filter) =>
        filter.value !== undefined && filter.value !== null ? (
          <div
            key={filter.name}
            className={`${s.filterBoxF} ${
              filter.value === filters[filter.name] ? s.selectedF : ""
            }`}
            onClick={() => handleFilterChange(filter.name, !filter.value)}
          >
            <svg
              className={`${s.iconF} ${
                ["gas", "microwave", "water"].includes(filter.name)
                  ? s.whiteFilStr
                  : ""
              }`}
            >
              <use href={`sprite.svg#${filter.icon}`}></use>
            </svg>
            <label>{filter.label}</label>
          </div>
        ) : null
      )}
    </div>
  );
};

export default FilterIcons;

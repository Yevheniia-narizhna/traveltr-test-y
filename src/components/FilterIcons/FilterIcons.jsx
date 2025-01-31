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

// const FilterIcons = ({ filters }) => {
//   const dispatch = useDispatch();

//   const handleFilterChange = (filterName, value) => {
//     dispatch(setFilter({ name: filterName, value }));
//   };

//   const shuffleArray = (array) => {
//     let shuffledArray = [...array];
//     for (let i = shuffledArray.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledArray[i], shuffledArray[j]] = [
//         shuffledArray[j],
//         shuffledArray[i],
//       ];
//     }
//     return shuffledArray;
//   };

//   const randomFilters = shuffleArray(allFilters).slice(0, 4);

//   return (
//     <div className={s.filterGroupF}>
//       {randomFilters.map((filter) => (
//         <div
//           key={filter.name}
//           className={`${s.filterBoxF} ${
//             filters[filter.name] ? s.selectedF : ""
//           }`}
//           onClick={() => handleFilterChange(filter.name, !filters[filter.name])}
//         >
//           <svg
//             className={`${s.iconF} ${
//               ["gas", "microwave", "water"].includes(filter.name)
//                 ? s.whiteFilStr
//                 : ""
//             }`}
//           >
//             <use href={`sprite.svg#${filter.icon}`}></use>
//           </svg>
//           <label>{filter.label}</label>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterIcons;

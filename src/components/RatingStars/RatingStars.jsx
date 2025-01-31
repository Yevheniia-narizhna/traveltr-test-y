import s from "./RatingStars.module.css";

const RatingStars = ({ rating }) => {
  const fullStars = rating;
  console.log(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className={s.contStars}>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <svg key={index} className={s.iconFull}>
            <use href="/sprite.svg#icon-Property-1Pressed"></use>
          </svg>
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <svg key={index} className={s.iconEmpty}>
            <use href="/sprite.svg#icon-Property-1Pressed"></use>
          </svg>
        ))}
    </div>
  );
};

export default RatingStars;

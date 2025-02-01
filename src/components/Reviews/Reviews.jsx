import { useSelector } from "react-redux";
import RatingStars from "../RatingStars/RatingStars";
import s from "./Reviews.module.css";

const Reviews = () => {
  const oneCamper = useSelector((state) => state.campers.oneCamper);

  if (!oneCamper || !oneCamper.reviews || oneCamper.reviews.length === 0) {
    return <p>No reviews found</p>;
  }
  return (
    <div className={s.contReviews}>
      <ul className={s.contList}>
        {oneCamper.reviews.map((review, index) => (
          <li key={index}>
            <div className={s.titles}>
              <div className={s.letter}>{review.reviewer_name.charAt(0)}</div>
              <div className={s.nameStar}>
                <h3>{review.reviewer_name}</h3>
                <div>
                  <RatingStars rating={review.reviewer_rating} />
                </div>
              </div>
            </div>
            <p className={s.textRew}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Reviews;

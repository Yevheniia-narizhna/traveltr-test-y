import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchCampersById } from "../../redux/campers/operations.js";
import s from "./DetailsCamper.module.css";
import FormBooking from "../FormBooking/FormBooking.jsx";

const DetailsCamper = ({ reviewsCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const loc = useLocation();
  console.log(id);

  const oneCamper = useSelector((state) => state.campers.oneCamper);

  useEffect(() => {
    dispatch(fetchCampersById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Перевіряємо, чи зараз активний лише "/details/:id" без підшляхів
    if (loc.pathname === `/catalog/${id}`) {
      navigate("features", { replace: true });
    }
  }, [navigate, loc.pathname, id]);

  if (!oneCamper) {
    return <div>Camper not found</div>;
  }

  const location = oneCamper.location || "Unknown location";

  const swapLocation = (loc) => {
    const parts = loc.split(", ");
    return parts.length === 2 ? `${parts[1]}, ${parts[0]}` : loc;
  };

  const swappedLocation = swapLocation(location);

  // Функція для відкриття модального вікна
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Функція для закриття модального вікна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={s.contDetail}>
      <div>
        <div className={s.contNamePrice}>
          <h2 className={s.name}>Campers {oneCamper.name}</h2>
        </div>
        <div className={s.ratingLocation}>
          <div className={s.rating}>
            <svg className={s.iconStar}>
              <use href="/sprite.svg#icon-Property-1Pressed"></use>
            </svg>
            {oneCamper.rating} ({reviewsCount} Reviews)
          </div>
          <div className={s.location}>
            <svg className={s.icon}>
              <use href="/sprite.svg#icon-Map"></use>
            </svg>
            {swappedLocation}
          </div>
          <div className={s.miniCont}>
            <p className={s.price}>
              €{oneCamper.price ? oneCamper.price.toFixed(2) : "0.00"}
            </p>
          </div>
        </div>
        <div>
          <div>
            <div className={s.galleryContainer}>
              {oneCamper.gallery?.length > 0 ? (
                oneCamper.gallery.map((image, index) => (
                  <img
                    key={index}
                    className={s.image}
                    src={image.thumb}
                    alt={`Camper ${oneCamper.name} ${index + 1}`}
                    onClick={() => openModal(image)} // Відкриття модалки
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>

            {/* Модальне вікно для перегляду великого зображення */}
            {isModalOpen && (
              <div className={s.modal} onClick={closeModal}>
                <div
                  className={s.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage?.thumb}
                    alt={`Large view ${oneCamper.name}`}
                    className={s.modalImage}
                  />
                  <button className={s.closeButton} onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <p>{oneCamper.description}</p>
      </div>
      <div>
        <ul className={s.links}>
          <li>
            <NavLink
              to="features"
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            >
              Features
            </NavLink>
          </li>

          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={s.contFeReForm}>
        <div>
          <Outlet />
        </div>
        <div>
          <FormBooking />
        </div>
      </div>
    </div>
  );
};
export default DetailsCamper;

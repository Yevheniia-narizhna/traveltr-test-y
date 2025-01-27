import s from "./Welcome.module.css";
const Welcome = () => {
  return (
    <div className={s.welcomeCont}>
      <h1>Campers of your dreams</h1>
      <p>You can find everything you want in our catalog</p>
      <button>View Now</button>
    </div>
  );
};

export default Welcome;

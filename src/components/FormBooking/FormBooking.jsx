import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import s from "./FormBooking.module.css";

const FormBooking = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    bookingDate: Yup.date().required("Booking date is required"),
    comment: Yup.string(),
  });

  return (
    <div className={s.contBooking}>
      <h2>Book your campervan now</h2>
      <p>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={s.formCont}>
          <div className={s.form}>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name*"
              className={s.input}
            />
            <ErrorMessage name="name" component="div" className={s.error} />
          </div>

          <div className={s.form}>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              className={s.input}
            />
            <ErrorMessage name="email" component="div" className={s.error} />
          </div>

          <div className={s.form}>
            <Field
              type="text"
              id="bookingDate"
              name="bookingDate"
              placeholder="Booking date*"
              className={s.input}
            />
            <ErrorMessage
              name="bookingDate"
              component="div"
              className={s.error}
            />
          </div>

          <div className={s.form}>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="Comment"
              className={s.input}
            />
            <ErrorMessage name="comment" component="div" className={s.error} />
          </div>

          <button type="submit" className={s.btnSubmit}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormBooking;

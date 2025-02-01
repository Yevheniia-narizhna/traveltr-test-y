import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import s from "./FormBooking.module.css";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const FormBooking = () => {
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const onSubmit = (values, { resetForm }) => {
    console.log("Form data", values);

    setTimeout(() => {
      toast.success("Camper booked successfully!");
      resetForm(); // Очищення форми після відправки
    }, 1000);
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
            <Field name="bookingDate">
              {({ field, form, meta }) => (
                <div>
                  <DatePicker
                    {...field}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => form.setFieldValue("bookingDate", date)}
                    dateFormat="yyyy-MM-dd"
                    className={s.input}
                    placeholderText="Booking date*"
                  />
                  {meta.touched && meta.error && (
                    <div className={s.error}>{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
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

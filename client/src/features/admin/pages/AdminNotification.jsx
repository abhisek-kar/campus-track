import React from "react";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminNotification = () => {
  const validationSchema = Yup.object().shape({
    receiver: Yup.string(),
    message: Yup.string().required("Message is Required"),
  });
  const sendOptions = ["Student", "Faculty", "Both"];
  const formik = useFormik({
    initialValues: {
      receiver: sendOptions[0],
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <AdminDashBoard>
      <form>
        <div className="flex gap-5 ">
          {sendOptions.map((item) => (
            <div key={item}>
              <label className="poppins-medium text-lg flex gap-1">
                <input
                  type="radio"
                  id={item}
                  name="receiver"
                  value={item}
                  checked={formik.values.receiver === item}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-4"
                />
                {item}
              </label>
            </div>
          ))}
        </div>
      </form>
    </AdminDashBoard>
  );
};

export default AdminNotification;

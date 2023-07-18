import React from "react";

import { Field } from "formik";

export const TextFieldWrapper = ({ as, name, touched, errors, ...props }) => {
  return (
    <Field
      as={as}
      name={name}
      helperText={touched[name] && errors[name]}
      error={errors[name] && touched[name]}
      variant="filled"
      autoComplete="on"
      sx={{ mt: 1, width: "80vw" }}
      {...props}
    />
  );
};

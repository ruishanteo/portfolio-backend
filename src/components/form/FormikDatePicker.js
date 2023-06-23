import React from "react";

import { useField, useFormikContext } from "formik";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const FormikDatePicker = (props) => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
  return (
    <DatePicker
      {...restProps}
      value={field.value ?? null}
      onChange={(val) => setFieldValue(name, val)}
    />
  );
};

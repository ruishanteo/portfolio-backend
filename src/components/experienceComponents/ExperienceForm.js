import React from "react";

import { Form, Formik } from "formik";

import * as Yup from "yup";

import { Box, Button, TextField, Typography } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { TextFieldWrapper } from "../form/TextFieldWrapper";
import { FormikDatePicker } from "../form/FormikDatePicker";

export const ExperienceForm = ({ title, initialValues, onSubmit }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box align="center">
        <Box
          sx={{
            padding: 5,
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 450 }}>
            {title}
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              startDate: Yup.date().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) =>
              onSubmit(values, setSubmitting)
            }
          >
            {({ errors, touched, values, isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 1,
                    width: "80vw",
                  }}
                >
                  <TextFieldWrapper
                    as={TextField}
                    name="title"
                    errors={errors}
                    touched={touched}
                    placeholder="Title"
                  />
                  <TextFieldWrapper
                    as={TextField}
                    name="company"
                    errors={errors}
                    touched={touched}
                    placeholder="Company"
                    multiline
                  />
                  <TextFieldWrapper
                    as={TextField}
                    name="description"
                    errors={errors}
                    touched={touched}
                    placeholder="Description"
                    multiline
                  />
                  <FormikDatePicker
                    name="startDate"
                    label="Start Date"
                    slotProps={{
                      textField: { variant: "filled", sx: { mt: 1 } },
                    }}
                  />
                  <FormikDatePicker
                    name="endDate"
                    label="End Date"
                    slotProps={{
                      textField: { variant: "filled", sx: { mt: 1 } },
                    }}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    sx={{ mt: 4 }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

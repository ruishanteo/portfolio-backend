import React from "react";

import { Field, Form, Formik } from "formik";

import * as Yup from "yup";

import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { TextFieldWrapper } from "../form/TextFieldWrapper";

export const TechStackForm = ({ title, initialValues, onSubmit }) => {
  return (
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
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Yup.object().shape({})}
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
                  name="name"
                  errors={errors}
                  touched={touched}
                  placeholder="Tech Name"
                />
                <TextFieldWrapper
                  as={TextField}
                  name="iconImg"
                  errors={errors}
                  touched={touched}
                  placeholder="Icon Image"
                />
                <Grid
                  container
                  sx={{
                    mt: 2,
                    justifyContent: "center",
                    align: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid item>
                    <Typography variant="h6">Show in profile:</Typography>
                  </Grid>
                  <Grid item>
                    <Field
                      as={Checkbox}
                      name="isInProfile"
                      type="checkbox"
                      variant="filled"
                      autoComplete="on"
                    />
                  </Grid>
                </Grid>
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
  );
};

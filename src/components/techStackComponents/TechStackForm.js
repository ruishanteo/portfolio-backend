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
import { ArrowLeft, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const TechStackForm = ({ title, initialValues, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <Box align="center">
      <Box sx={{ mt: 5 }} width="80vw">
        <Typography variant="h4" sx={{ fontWeight: 450 }}>
          {title}
        </Typography>

        <Box align="left">
          <Button
            sx={{ mb: 5 }}
            variant="contained"
            startIcon={<ArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

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
                  sx={{ mt: 4, width: 200 }}
                  variant="contained"
                  endIcon={<Send />}
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

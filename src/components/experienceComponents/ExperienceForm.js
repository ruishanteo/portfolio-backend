import React from "react";

import { Form, Formik } from "formik";

import * as Yup from "yup";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { TextFieldWrapper } from "../form/TextFieldWrapper";
import { FormikDatePicker } from "../form/FormikDatePicker";
import { ArrowLeft, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const ExperienceForm = ({ title, initialValues, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            enableReinitialize
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
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Grid container direction="column">
                  <Grid item>
                    <TextFieldWrapper
                      as={TextField}
                      name="title"
                      errors={errors}
                      touched={touched}
                      placeholder="Title"
                    />
                  </Grid>
                  <Grid item>
                    <TextFieldWrapper
                      as={TextField}
                      name="company"
                      errors={errors}
                      touched={touched}
                      placeholder="Company"
                      multiline
                    />
                  </Grid>
                  <Grid item>
                    <TextFieldWrapper
                      as={TextField}
                      name="description"
                      errors={errors}
                      touched={touched}
                      placeholder="Description"
                      multiline
                      rows={5}
                    />
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Grid item>
                      <FormikDatePicker
                        name="startDate"
                        label="Start Date"
                        views={["year", "month"]}
                        slotProps={{
                          textField: {
                            variant: "filled",
                            sx: { mt: 1 },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <FormikDatePicker
                        name="endDate"
                        label="End Date"
                        views={["year", "month"]}
                        slotProps={{
                          textField: {
                            variant: "filled",
                            sx: { mt: 1 },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item align="right">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ mt: 4, width: 200 }}
                      variant="contained"
                      endIcon={<Send />}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

import React from "react";

import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTechStack } from "../../backend/techStackStore";

import { Field, Form, Formik } from "formik";

import * as Yup from "yup";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { VariableField } from "../form/VariableField";
import { TextFieldWrapper } from "../form/TextFieldWrapper";
import { FormikDatePicker } from "../form/FormikDatePicker";
import { ArrowLeft, Send } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
  return this.test("unique", message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

export const ProjectForm = ({ title, initialValues, onSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const techstack = useSelector((state) => state.techstack.techStack);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(fetchTechStack);
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    onUpdate();
  }, [onUpdate]);

  if (loading) return <></>;

  const techStackOptions = techstack.map((tech) => tech.name);

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
              techStack: Yup.array()
                .of(Yup.string())
                .unique("Please enter only unique tech stack"),
            })}
            onSubmit={(values, { setSubmitting }) =>
              onSubmit(values, setSubmitting)
            }
          >
            {({ errors, touched, values, isSubmitting }) => (
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
                      name="thumbnailImg"
                      errors={errors}
                      touched={touched}
                      placeholder="Thumbnail Image"
                    />
                  </Grid>

                  <Grid item>
                    <TextFieldWrapper
                      as={TextField}
                      name="fullSizedImg"
                      errors={errors}
                      touched={touched}
                      placeholder="Full Image"
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
                      row={5}
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
                          textField: { variant: "filled", sx: { mt: 1 } },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <FormikDatePicker
                        name="endDate"
                        label="End Date"
                        views={["year", "month"]}
                        slotProps={{
                          textField: { variant: "filled", sx: { mt: 1 } },
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item>
                    {techStackOptions.length > 0 && (
                      <VariableField
                        values={values}
                        name="techStack"
                        displayName="Tech Stack"
                        emptyValue=""
                        fieldCreator={(name, index, value) => (
                          <Field
                            as={Select}
                            name={`${name}.${index}`}
                            value={value}
                            displayEmpty
                            variant="filled"
                            sx={{ mt: 1 }}
                            fullWidth
                          >
                            <MenuItem value="">
                              Please select an option
                            </MenuItem>
                            {techStackOptions.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        )}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    <VariableField
                      values={values}
                      name="links"
                      displayName="Link"
                      emptyValue={{ displayText: "", url: "" }}
                      fieldCreator={(name, index, value) => (
                        <Grid container direction="column">
                          <Grid item>
                            <TextFieldWrapper
                              as={TextField}
                              name={`${name}.${index}.displayText`}
                              errors={errors}
                              touched={touched}
                              placeholder="Display Text"
                            />
                          </Grid>
                          <Grid item>
                            <TextFieldWrapper
                              fullWidth
                              as={TextField}
                              name={`${name}.${index}.url`}
                              errors={errors}
                              touched={touched}
                              placeholder="URL"
                            />
                          </Grid>
                        </Grid>
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ mt: 4, mb: 4, width: 200 }}
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

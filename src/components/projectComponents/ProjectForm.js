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

Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
  return this.test("unique", message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

export const ProjectForm = ({ title, initialValues, onSubmit }) => {
  const dispatch = useDispatch();
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
                    name="thumbnailImg"
                    errors={errors}
                    touched={touched}
                    placeholder="Thumbnail Image"
                  />
                  <TextFieldWrapper
                    as={TextField}
                    name="fullSizedImg"
                    errors={errors}
                    touched={touched}
                    placeholder="Full Image"
                  />
                  <TextFieldWrapper
                    as={TextField}
                    name="title"
                    errors={errors}
                    touched={touched}
                    placeholder="Title"
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

                  <VariableField
                    values={values}
                    name="techStack"
                    displayName="Tech stack"
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
                        <MenuItem value="">Please select an option</MenuItem>
                        {techStackOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Field>
                    )}
                  />

                  <VariableField
                    values={values}
                    name="links"
                    displayName="Link"
                    emptyValue={{ displayText: "", url: "" }}
                    fieldCreator={(name, index, value) => (
                      <Grid container direction="column">
                        <Grid item width="100%">
                          <TextFieldWrapper
                            as={TextField}
                            name={`${name}.${index}.displayText`}
                            errors={errors}
                            touched={touched}
                            placeholder="Display Text"
                          />
                        </Grid>
                        <Grid item width="100%">
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

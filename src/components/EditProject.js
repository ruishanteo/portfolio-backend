import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Timestamp } from "firebase/firestore";

import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";

import * as Yup from "yup";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";

import { editProject, readProject } from "../backend/projectsStore";

const TechStackOptions = [
  "angularjs",
  "bash",
  "firebase",
  "flutter",
  "git",
  "github",
  "gitlab",
  "go",
  "java",
  "javascript",
  "materialui",
  "mysql",
  "nextjs",
  "nodejs",
  "postgresql",
  "python",
  "react",
  "redux",
  "typescript",
  "vscode",
];

const FormikDatePicker = (props) => {
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

const TextFieldWrapper = ({ as, name, touched, errors, ...props }) => {
  return (
    <Field
      fullWidth
      as={as}
      name={name}
      helperText={touched[name] && errors[name]}
      error={errors[name] && touched[name]}
      variant="filled"
      autoComplete="on"
      sx={{ mt: 1 }}
      {...props}
    />
  );
};

const VariableField = ({
  values,
  name,
  displayName,
  emptyValue,
  fieldCreator,
}) => {
  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant="h5">{displayName}</Typography>
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <Box>
              {values[name] && values[name].length > 0 ? (
                values[name].map((value, index) => (
                  <Box key={index}>
                    {fieldCreator(name, index, value)}
                    <IconButton onClick={() => arrayHelpers.remove(index)}>
                      <Remove />
                    </IconButton>
                    <IconButton
                      onClick={() => arrayHelpers.insert(index + 1, emptyValue)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                ))
              ) : (
                <Button
                  variant="contained"
                  onClick={() => arrayHelpers.push(emptyValue)}
                  sx={{ mt: 1 }}
                >
                  <Typography>Add a {displayName}</Typography>
                </Button>
              )}
            </Box>
          )}
        />
        <ErrorMessage name={name} />
      </CardContent>
    </Card>
  );
};

Yup.addMethod(Yup.array, "unique", function (message, mapper = (a) => a) {
  return this.test("unique", message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

export const EditProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId;
  const [loading, setLoading] = useState(true);

  const project = useSelector((state) => state.project);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(readProject(projectId));
    setLoading(false);
  }, [dispatch, projectId]);

  useEffect(() => {
    onUpdate();
  }, [onUpdate]);

  if (loading || !project) {
    return <></>;
  }

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
            EDIT PROJECT
          </Typography>

          <Formik
            initialValues={{
              ...project,
              startDate: dayjs(new Date(project.startDate)),
              endDate: dayjs(new Date(project.endDate)),
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              startDate: Yup.date().required("Required"),
              techStack: Yup.array()
                .of(Yup.string())
                .unique("Please enter only unique tech stack"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(
                editProject(
                  {
                    ...values,
                    startDate: Timestamp.fromDate(new Date(values.startDate)),
                    endDate: Timestamp.fromDate(new Date(values.endDate)),
                  },
                  projectId
                )
              );
              setSubmitting(false);
              navigate("/home");
            }}
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
                        {TechStackOptions.map((option) => (
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
                    Save Changes
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

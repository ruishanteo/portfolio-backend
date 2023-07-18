import React from "react";

import { ErrorMessage, FieldArray } from "formik";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export const VariableField = ({
  values,
  name,
  displayName,
  emptyValue,
  fieldCreator,
}) => {
  return (
    <Card sx={{ mt: 1, background: "none", boxShadow: "none" }}>
      <CardContent>
        <Typography variant="h5">{displayName}</Typography>
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <Box>
              <Grid container spacing={1} justifyContent="center">
                {values[name] && values[name].length > 0 ? (
                  values[name].map((value, index) => (
                    <Grid item xs="auto" key={index}>
                      {fieldCreator(name, index, value)}

                      <Box align="center">
                        <IconButton onClick={() => arrayHelpers.remove(index)}>
                          <Remove />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            arrayHelpers.insert(index + 1, emptyValue)
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Grid>
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
              </Grid>
            </Box>
          )}
        />
        <ErrorMessage name={name} />
      </CardContent>
    </Card>
  );
};

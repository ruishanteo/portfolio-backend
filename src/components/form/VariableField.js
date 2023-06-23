import React from "react";

import { ErrorMessage, FieldArray } from "formik";

import {
  Box,
  Button,
  Card,
  CardContent,
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
    <Card sx={{ mt: 1, background: "none" }}>
      <CardContent>
        <Typography>{displayName}</Typography>
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

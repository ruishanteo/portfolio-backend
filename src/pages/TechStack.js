import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchTechStack } from "../backend/techStackStore";

import { useAuth } from "../backend/FirebaseHooks";

import { Box, Button, Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import { Tech } from "../components/techStackComponents/Tech";

export function TechStack() {
  const user = useAuth();
  const navigate = useNavigate();

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
  }, [user, onUpdate]);

  return (
    <Box align="center">
      <Button
        sx={{ mt: 5 }}
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate("/techstack/new")}
      >
        Tech
      </Button>

      <Box mt={5} align="center">
        {loading ? (
          <></>
        ) : !techstack || techstack.length === 0 ? (
          <Box>
            <Typography align="center">No tech found.</Typography>
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {techstack.map((tech) => {
              return (
                <Grid item key={tech.id}>
                  <Tech tech={tech} onUpdate={onUpdate} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

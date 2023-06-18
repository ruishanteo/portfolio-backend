import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchProjects } from "../backend/projectsStore";

import { useAuth } from "../backend/FirebaseHooks";

import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Project } from "../components/Project";

export function Home() {
  const user = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const projects = useSelector((state) => state.projects);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(fetchProjects);
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
        onClick={() => navigate("/new")}
      >
        Project
      </Button>

      <Box mt={5} align="center">
        {loading ? (
          <></>
        ) : projects.length === 0 ? (
          <Box>
            <Typography align="center">No projects found.</Typography>
          </Box>
        ) : (
          projects.map((project) => {
            return (
              <Project project={project} onUpdate={onUpdate} key={project.id} />
            );
          })
        )}
      </Box>
    </Box>
  );
}

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchProjects } from "../backend/projectsStore";
import { fetchTechStack } from "../backend/techStackStore";

import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Project } from "../components/projectComponents/Project";

export function Projects() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const projects = useSelector((state) => state.projects.projects);
  const techStack = useSelector((state) => state.techstack.techStack);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(fetchProjects);
    dispatch(fetchTechStack);
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    onUpdate();
  }, [onUpdate]);

  return (
    <Box align="center">
      <Button
        sx={{ mt: 5 }}
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate("/projects/new")}
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
              <Project
                project={project}
                techStack={techStack}
                onUpdate={onUpdate}
                key={project.id}
              />
            );
          })
        )}
      </Box>
    </Box>
  );
}

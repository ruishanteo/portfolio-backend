import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Experience } from "../components/experienceComponents/Experience";

import { fetchExperiences } from "../backend/experiencesStore";

import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export function Experiences() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const experiences = useSelector((state) => state.experiences.experiences);

  const onUpdate = useCallback(() => {
    setLoading(true);
    dispatch(fetchExperiences);
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
        onClick={() => navigate("new")}
      >
        Experience
      </Button>

      <Box mt={5} align="center">
        {loading ? (
          <></>
        ) : !experiences || experiences.length === 0 ? (
          <Box>
            <Typography align="center">No experiences found.</Typography>
          </Box>
        ) : (
          experiences.map((experience) => {
            return (
              <Experience
                experience={experience}
                onUpdate={onUpdate}
                key={experience.id}
              />
            );
          })
        )}
      </Box>
    </Box>
  );
}

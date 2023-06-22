import { useNavigate } from "react-router-dom";

import { Box, Button, Stack, Typography } from "@mui/material";

export function Home() {
  const navigate = useNavigate();

  return (
    <Box align="center" sx={{ mt: 5 }}>
      <Stack spacing={3} width={300}>
        <Typography variant="h4">Get started!</Typography>
        <Button variant="contained" onClick={() => navigate("/projects")}>
          Projects
        </Button>
        <Button variant="contained" onClick={() => navigate("/experiences")}>
          Experiences
        </Button>
        <Button variant="contained" onClick={() => navigate("/techstack")}>
          Tech Stack
        </Button>
      </Stack>
    </Box>
  );
}

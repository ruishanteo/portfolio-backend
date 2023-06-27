import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteExperience } from "../../backend/experiencesStore";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export function Experience({ experience, onUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (experienceId) => {
    dispatch(deleteExperience(experienceId));
    setOpenDelete(false);
    onUpdate();
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 5,
        backgroundColor: "rgba(0,0,0,0.1)",
        width: "70vw",
        p: 2,
        borderRadius: 6,
        alignItems: "left",
      }}
    >
      <Grid container direction="column" align="left">
        <Grid container direction="row">
          <Grid item>
            <IconButton onClick={() => setOpenDelete(true)}>
              <Delete />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => navigate(`/experiences/${experience.id}`)}
            >
              <Edit />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant="h6">Title: {experience.title}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Company: </Typography>
          <Typography>{experience.company}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Description: </Typography>
          <Typography>{experience.description}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Start: {experience.startDate}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">End: {experience.endDate}</Typography>
        </Grid>

        <Grid item>
          <Dialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action is irreversible. Confirm delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
              <Button onClick={() => handleDelete(experience.id)} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

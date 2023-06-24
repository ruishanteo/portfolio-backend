import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteTech } from "../../backend/techStackStore";

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

export function Tech({ tech, onUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (techId) => {
    dispatch(deleteTech(techId));
    setOpenDelete(false);
    onUpdate();
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 5,
        backgroundColor: "rgba(0,0,0,0.1)",
        p: 2,
        borderRadius: 6,
        alignItems: "left",
        height: 280,
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
            <IconButton onClick={() => navigate(`/techstack/${tech.id}`)}>
              <Edit />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6">Name: {tech.name}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Icon:</Typography>
          <img src={tech.iconImg} alt="icon pic" width={100} height={100} />
        </Grid>

        <Grid item>
          <Typography variant="h6">Show in profile? </Typography>
          <Typography>{tech.isInProfile ? "True" : "False"}</Typography>
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
              <Button onClick={() => handleDelete(tech.id)} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProject } from "../backend/projectsStore";

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
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export function Project({ project, onUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (projectId) => {
    dispatch(deleteProject(projectId));
    setOpenDelete(false);
    onUpdate();
  };

  const exceptions = { firebase: true };

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
            <IconButton onClick={() => navigate(`/project/${project.id}`)}>
              <Edit />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h6">Title: {project.title}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Thumbnail:</Typography>
          <img src={project.thumbnailImg} alt="thumbnail pic" width={200} />
        </Grid>

        <Typography variant="h6">FullSize:</Typography>
        <Grid item>
          <img src={project.fullSizedImg} alt="full size pic" width={200} />
        </Grid>

        <Grid item>
          <Typography variant="h6">Description: </Typography>
          <Typography>{project.description}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Start: {project.startDate}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">End: {project.endDate}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h6">Links:</Typography>
          {project.links.map((link) => {
            return (
              <Link href={`${link.url}`} key={link.displayText}>
                <Typography>{link.displayText}</Typography>
              </Link>
            );
          })}
        </Grid>

        <Grid item>
          <Typography variant="h6">Tech Stack:</Typography>
          <Grid container direction="row" spacing={1}>
            {project.techStack.map((tech) => {
              const type = exceptions[tech] ? "plain" : "original";
              return (
                <Grid item key={tech}>
                  <Tooltip title={tech}>
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-${type}.svg`}
                      alt={tech}
                      width={30}
                    />
                  </Tooltip>
                </Grid>
              );
            })}
          </Grid>
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
              <Button onClick={() => handleDelete(project.id)} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}

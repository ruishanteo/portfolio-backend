import React from "react";

import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/home"
            sx={{
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontFamily: "Didot",
              fontWeight: 750,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            backend
          </Typography>

          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/home"
            sx={{
              justifyContent: "center",
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Didot",
              fontWeight: 750,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            backend
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

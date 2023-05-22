import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Filter from "./Filter";

export default function Header({ filter, handleChange, handleFilter }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky" sx={{ top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "none", lg: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SpaceX
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              p: 2,
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          >
            <Filter filter={filter} handleChange={handleChange} />
          </Stack>

          <Box sx={{ flexGrow: 1, display: { md: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              onClick={() => {
                setDrawerOpen((prev) => !prev);
              }}
              color="inherit"
            >
              <ExpandMoreIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={() => {
                setDrawerOpen(false);
              }}
              style={{ position: "relative" }}
            >
              <Box style={{ width: "100%", position: "relative" }}>
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{
                    maxWidth: "50%",
                    p: 2,
                  }}
                >
                  <Filter filter={filter} handleChange={handleChange} />
                </Stack>
                <Button
                  sx={{
                    position: "absolute",
                    mb: 2,
                    mr: 2,
                    right: 0,
                    bottom: 0,
                    width: "fit-content",
                    color: "donkey.black",
                  }}
                  variant="outlined"
                  onClick={() => {
                    handleFilter();
                    setDrawerOpen(false);
                  }}
                >
                  確認
                </Button>
              </Box>
            </Drawer>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: "flex", lg: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SpaceX
          </Typography>
          <Button
            sx={{
              position: "absolute",
              right: 0,
              width: "fit-content",
              height: "fit-content",
              color: "donkey.black",
              display: { xs: "none", md: "none", lg: "flex" },
            }}
            variant="outlined"
            onClick={() => {
              handleFilter();
              setDrawerOpen(false);
            }}
          >
            確認
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

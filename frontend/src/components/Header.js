import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  MenuItem,
  InputBase,
  Drawer,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ filter, handleChange, handleFilter }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "secondary.main", color: "text.black", top: 0 }}
    >
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
            <Search sx={{ width: 0.2 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="zh-cn"
            >
              <DatePicker
                // eslint-disable-next-line react/jsx-props-no-spreading
                slots={<TextField />}
                label={"開始發射時間"}
                sx={{ width: 0.2 }}
              />
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="zh-cn"
            >
              <DatePicker
                // eslint-disable-next-line react/jsx-props-no-spreading
                slots={<TextField />}
                label={"結束發射時間"}
                sx={{ width: 0.2 }}
              />
            </LocalizationProvider>
            <FormControl sx={{ width: 0.2 }}>
              <InputLabel>發射狀態</InputLabel>
              <Select value={"all"} label="發射狀態">
                <MenuItem value={"all"}>全部</MenuItem>
                <MenuItem value={true}>是</MenuItem>
                <MenuItem value={false}>否</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ width: 0.2 }}>
              <InputLabel>排序</InputLabel>
              <Select value={"ascending"} label="排序">
                <MenuItem value={"ascending"}>發射時間由近到遠</MenuItem>
                <MenuItem value={"descending"}>發射時間由遠到近</MenuItem>
              </Select>
            </FormControl>
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
                  <FormControl fullWidth>
                    <InputLabel>發送名稱</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                      label="發送名稱"
                      value={filter.name}
                      onChange={handleChange("name")}
                    />
                  </FormControl>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="zh-cn"
                  >
                    <DatePicker
                      slots={<TextField />}
                      label={"開始發射時間"}
                      onChange={handleChange("start")}
                      value={filter.start ? dayjs(filter.start) : null}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="zh-cn"
                  >
                    <DatePicker
                      slots={<TextField />}
                      label={"結束發射時間"}
                      onChange={handleChange("end")}
                      value={filter.end ? dayjs(filter.end) : null}
                    />
                  </LocalizationProvider>
                  <FormControl fullWidth>
                    <InputLabel>發射狀態</InputLabel>
                    <Select
                      value={filter.status}
                      label="發射狀態"
                      onChange={handleChange("status")}
                    >
                      <MenuItem value={"all"}>全部</MenuItem>
                      <MenuItem value={true}>是</MenuItem>
                      <MenuItem value={false}>否</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>排序</InputLabel>
                    <Select
                      value={filter.sort}
                      label="排序"
                      onChange={handleChange("sort")}
                    >
                      <MenuItem value={-1}>發射時間由近到遠</MenuItem>
                      <MenuItem value={1}>發射時間由遠到近</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Button
                  sx={{
                    position: "absolute",
                    mb: 2,
                    mr: 2,
                    right: 0,
                    bottom: 0,
                    width: "fit-content",
                    color: "#000000",
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
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "none", lg: "flex" },
            }}
          ></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

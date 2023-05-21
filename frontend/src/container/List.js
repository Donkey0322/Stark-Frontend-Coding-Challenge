import NorthIcon from "@mui/icons-material/North";
import { Box, Paper, Grid, Button, CircularProgress, Fab } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import _ from "lodash";
import moment from "moment";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ImageContainer from "../components/Image";
import { getLaunch } from "../middleware";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "transparent",
  color: theme.palette.text.white,
  flexDirection: "column",
  rowGap: theme.spacing(2),
}));

export default function List() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    start: undefined,
    end: undefined,
    status: "all",
    sort: -1,
  });
  const [nextPage, setNextPage] = useState(true); //有無
  const [rockets, setRockets] = useState([]);

  const handleChange = (name) => (e) => {
    let value;
    if (e.target) {
      value = e.target.value;
    } else {
      value = moment(e.toISOString()).format("YYYY-MM-DD");
    }
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async () => {
    ScrollToTop();
    const data = await getLaunch(1, filter);
    setRockets(data.docs);
    setCurrentPage(data.page);
    setNextPage(data.hasNextPage);
  };

  const ScrollToEnd = () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 2 &&
      nextPage &&
      !fetching
    ) {
      ThrottleEndFetch();
    }
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const ThrottleEndFetch = _.debounce(async () => {
    setFetching(true);
    const data = await getLaunch(currentPage + 1, filter);
    setTimeout(() => {
      setRockets((prev) => [...prev, ...data.docs]);
      setFetching(false);
      setCurrentPage(data.page);
      setNextPage(data.hasNextPage);
    }, "1000");
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", ScrollToEnd);
    return () => {
      window.removeEventListener("scroll", ScrollToEnd);
    };
  }, [nextPage, currentPage, filter]);

  useEffect(() => {
    if (!rockets.length) {
      (async () => {
        const data = await getLaunch();
        setRockets(data.docs);
        setCurrentPage(data.page);
        setNextPage(data.hasNextPage);
      })();
    }
  }, []);

  return (
    <>
      <Header
        filter={filter}
        handleChange={handleChange}
        handleFilter={handleFilter}
      />
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 4,
          backgroundColor: "#000000",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          columnSpacing={{ xs: 2, md: 3 }}
          rowSpacing={{ xs: 8, md: 8 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {rockets.map((rocket, index) => (
            <Grid item xs={4} sm={4} md={6} key={index}>
              <Item>
                <ImageContainer>
                  {rocket?.links?.flickr.original?.[0] && (
                    <LazyLoadImage
                      src={rocket?.links?.flickr.original?.[0]}
                      width={"100%"}
                    />
                  )}
                </ImageContainer>
                <Box sx={{ mt: 4 }}>
                  {moment(rocket.date_utc).format("MMMM D, YYYY")}
                </Box>
                <Box
                  sx={{ mt: 2, fontWeight: "bold", fontSize: "h6.fontSize" }}
                >
                  {rocket.name}
                </Box>
                <Button
                  variant="outlined"
                  sx={{ mt: 5 }}
                  onClick={() => {
                    navigate(`/launch/${rocket.id}`);
                  }}
                >
                  Learn More
                </Button>
              </Item>
            </Grid>
          ))}
          {fetching && (
            <Grid
              item
              xs={4}
              sm={8}
              md={12}
              sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            </Grid>
          )}
        </Grid>
        <Fab
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "fab.main",
            opacity: 0.7,
          }}
          onClick={() => {
            ScrollToTop();
          }}
        >
          <NorthIcon />
        </Fab>
      </Box>
    </>
  );
}

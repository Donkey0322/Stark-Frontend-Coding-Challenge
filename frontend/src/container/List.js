import { useState, useEffect } from "react";
import { experimentalStyled } from "@mui/material/styles";
import NorthIcon from "@mui/icons-material/North";
import { Box, Paper, Grid, Button, CircularProgress, Fab } from "@mui/material";
import { getLaunch } from "../middleware";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Item = experimentalStyled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "transparent",
  color: theme.palette.text.white,
  flexDirection: "column",
  rowGap: theme.spacing(2),
}));

const ImgContainer = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
  }
  &:hover {
    > div {
      background-color: white;
      transition: all 0.3s ease;
      opacity: 0.7;
    }
    img {
      transform: scale(1.25);
    }
  }
`;

export default function ResponsiveGrid() {
  const [rockets, setRockets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextPage, setNextPage] = useState(true); //有無 0, 1
  const [fetching, setFetching] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    start: undefined,
    end: undefined,
    status: "all",
    sort: -1,
  });
  const navigate = useNavigate();

  const handleFilter = async () => {
    ScrollToTop();
    const data = await getLaunch(1, filter);
    setRockets(data.docs);
    setCurrentPage(data.page);
    setNextPage(data.hasNextPage);
  };

  const handleChange = (name) => (e) => {
    let value;
    if (e.target) {
      value = e.target.value;
    } else {
      value = moment(e.toISOString()).format("YYYY-MM-DD");
    }
    setFilter((prev) => ({ ...prev, [name]: value }));
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
  });

  useEffect(() => {
    (async () => {
      if (!rockets.length) {
        const data = await getLaunch();
        setRockets(data.docs);
        setCurrentPage(data.page);
        setNextPage(data.hasNextPage);
      }
    })();
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
                <ImgContainer>
                  <LazyLoadImage
                    src={rocket?.links?.flickr.original?.[0] ?? null}
                    alt=""
                    width={"100%"}
                  />
                </ImgContainer>
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

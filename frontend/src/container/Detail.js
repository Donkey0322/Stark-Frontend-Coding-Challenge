import { useState, useEffect } from "react";
import { experimentalStyled } from "@mui/material/styles";
import NorthIcon from "@mui/icons-material/North";
import { Box, Paper, Grid, Button, CircularProgress, Fab } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getLaunch } from "../middleware";
import moment from "moment";
import _ from "lodash";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Item = experimentalStyled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "transparent",
  color: theme.palette.text.white,
  flexDirection: "column",
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
    img {
      transform: scale(1.25);
    }
  }
`;

export default function ResponsiveGrid() {
  const [rocket, setRocket] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!rocket) {
        const data = await getLaunch(undefined, undefined, id);
        setRocket(data);
      }
    })();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 2,
        py: 1,
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {rocket && (
        <>
          <Button
            sx={{
              width: "fit-content",
              mb: 1,
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <KeyboardArrowLeftIcon /> BACK TO LAUNCHES
          </Button>
          <Grid
            container
            columnSpacing={{ xs: 2, md: 3 }}
            rowSpacing={{ xs: 8, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={8} md={12}>
              <ImgContainer
                style={{ maxWidth: rocket?.links?.webcast && "800px" }}
              >
                {rocket?.links?.webcast ? (
                  <iframe
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                    src={`https://youtube.com/embed/${rocket?.links?.youtube_id}?autoplay=0`}
                    width={"100%"}
                    height={"100%"}
                    style={{ border: "none" }}
                  />
                ) : (
                  <LazyLoadImage
                    src={rocket?.links?.flickr.original?.[0] ?? null}
                    alt=""
                    width={"100%"}
                  />
                )}
              </ImgContainer>
            </Grid>
          </Grid>
          <Item>
            <Box sx={{ mt: 2 }}>
              {moment(rocket.date_utc).format("MMMM D, YYYY")}
            </Box>
            <Box sx={{ mt: 2, fontWeight: "bold", fontSize: "h6.fontSize" }}>
              {rocket.name}
            </Box>
            <Box sx={{ mt: 5 }}>{rocket.details}</Box>
          </Item>
        </>
      )}
    </Box>
  );
}

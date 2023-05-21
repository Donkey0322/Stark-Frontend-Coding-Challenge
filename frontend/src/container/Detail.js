import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, Paper, Grid, Button } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import _ from "lodash";
import moment from "moment";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams, useNavigate } from "react-router-dom";
import ImageContainer from "../components/Image";
import { getLaunch } from "../middleware";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: "transparent",
  color: theme.palette.text.white,
  flexDirection: "column",
}));

export default function ResponsiveGrid() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rocket, setRocket] = useState(undefined);

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
        boxSizing: "border-box",
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
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ImageContainer style={{ maxWidth: "800px" }}>
                  {rocket?.links?.webcast ? (
                    <iframe
                      sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                      src={`https://youtube.com/embed/${rocket?.links?.youtube_id}?autoplay=0`}
                      width={"100%"}
                      height={"100%"}
                      style={{ border: "none" }}
                    />
                  ) : (
                    rocket?.links?.flickr.original?.[0] && (
                      <LazyLoadImage
                        src={rocket?.links?.flickr.original?.[0]}
                        alt=""
                        width={"100%"}
                      />
                    )
                  )}
                </ImageContainer>
              </Box>
            </Grid>
          </Grid>
          <Item>
            <Box sx={{ mt: 2 }}>
              {moment(rocket.date_utc).format("MMMM D, YYYY")}
            </Box>
            <Box sx={{ mt: 2, fontWeight: "bold", fontSize: "h6.fontSize" }}>
              {rocket.name}
            </Box>
            <Box sx={{ mt: 5 }}>{rocket?.details ?? "None"}</Box>
          </Item>
        </>
      )}
    </Box>
  );
}

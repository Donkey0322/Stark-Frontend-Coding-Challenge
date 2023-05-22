import styled from "styled-components";
import { Box } from "@mui/material";
const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default ({
  children = <Box sx={{ color: "donkey.white" }}>No Picture</Box>,
  ...prop
}) => {
  return <ImageContainer {...prop}>{children}</ImageContainer>;
};

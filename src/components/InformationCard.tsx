import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Movie } from "../models/UpcomingMovie";
import { useState } from "react";
import { getUpcomingMovies } from "../services/ApiRequest";
import { useQuery } from "@tanstack/react-query";
import { colors } from "../styles/Colors";

interface MovieProps {
  data: Movie;
}
export default function InformationCard({ data }: MovieProps) {
  const imageUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;

  return (
    <Card
      elevation={3}
      sx={{ width: "20%", mx: "1%", transition: "transform 0.2s" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={data.original_language}
          image={imageUrl}
          // sx={{
          //   "&:hover": {
          //     transform: "scale(1.1)", // Increase the size when hovered
          //   },
          // }}
        />
        <CardContent>
          <Typography>{data.release_date}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    // <Card
    //   elevation={3}
    //   sx={{ width: "20%", mx: "1%" }}
    //   style={{
    //     backgroundImage: `url(${imageUrl})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     color: "#fff", // Text color
    //     // minHeight: "30vh", // Adjust the height as needed
    //     position: "relative",
    //   }}
    // >
    //   <CardContent>
    //     <Typography variant="h6">{data.original_language}</Typography>
    //     <Typography variant="body2">{data.release_date}</Typography>
    //   </CardContent>
    // </Card>
  );
}

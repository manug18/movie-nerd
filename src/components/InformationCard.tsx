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
import { useNavigate } from "react-router-dom";

interface MovieProps {
  data: Movie;
  onClick: (movieId: number) => void;
}
export default function InformationCard({ data, onClick }: MovieProps) {
  const imageUrl = `https://image.tmdb.org/t/p/original${data.poster_path}`;
  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <Card
      elevation={3}
      onClick={handleClick}
      sx={{
        width: "20%",
        mx: "1%",
        transition: "transform 0.2s",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={data.original_language}
          image={imageUrl}
        />
        <CardContent>
          <Typography>{data.release_date}</Typography>
          <Typography>{data.id}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

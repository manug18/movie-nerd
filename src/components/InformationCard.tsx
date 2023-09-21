import { Card, Stack, Typography } from "@mui/material";
import { UpcomingMovie } from "../models/UpcomingMovie";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../services/ApiRequest";

interface UpcomingMovieProps {
  data: UpcomingMovie;
}
export default function InformationCard({ data }: UpcomingMovieProps) {
  const upcomingMovieService = useQuery(
    ["upcomingMovieData"],
    getUpcomingMovies
  );
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>(
    upcomingMovieService.data?.results || []
  );

  console.log(data);
  console.log(upcomingMovies);
  return (
    <Card elevation={3}>
      {data.original_language}
      {upcomingMovies.map((movie) => (
        <Typography> {movie.genre_ids}</Typography>
      ))}
    </Card>
  );
}

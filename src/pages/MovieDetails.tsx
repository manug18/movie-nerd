import { Card, CardMedia, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/ApiRequest";
import { colors } from "../styles/Colors";
import HomePageFooter from "../components/Footer";
import { useEffect, useState } from "react";
import { MovieDetails } from "../models/UpcomingMovie";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

export default function MovieDetailedInformation() {
  const { movieId } = useParams();

  const parsedMovieId = movieId ? parseInt(movieId, 10) : 0;
  const movieService = useQuery({
    queryKey: ["get-movie"],
    queryFn: () => getMovieById({ movieId: parsedMovieId }),
    enabled: !!parsedMovieId,
  });
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  useEffect(() => {
    if (movieService.data) {
      setMovieDetails(movieService.data);
    }
  }, [movieService.data]);

  const backdropPath = movieService.data?.backdrop_path;
  const imageUrl = `https://image.tmdb.org/t/p/original${movieService.data?.poster_path}`;

  const backdropImageUrl = backdropPath ? `${imageBaseUrl}${backdropPath}` : "";
  return (
    <>
      <Stack
        sx={{
          backgroundImage: backdropImageUrl
            ? `url(${backdropImageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
        spacing={2}
      >
        <Stack
          direction={"row"}
          sx={{
            zIndex: 1,
            bgcolor: colors.primary,
            opacity: 0.9,
            height: "100%",
          }}
        >
          <Stack sx={{ width: "30%", py: "10%", pl: "10%", pr: "5%" }}>
            <Card
              sx={{
                borderRadius: 7, // Add border radius to the Card
                display: "flex", // Use flex display to align image and content
              }}
            >
              <CardMedia
                component="img"
                image={imageUrl}
                alt="Movie Poster"
                sx={{
                  height: "100%", // Make the image fill the Card vertically
                  objectFit: "cover", // Ensure the image covers the Card
                  borderTopLeftRadius: 7, // Add border radius to the top-left corner
                  borderBottomLeftRadius: 10, // Add border radius to the bottom-left corner
                }}
              />
            </Card>
          </Stack>
          <Stack sx={{ width: "70%", py: "10%" }}>
            <Typography color={colors.white} fontSize={26}>
              {movieDetails?.original_title}(
              {movieDetails?.release_date.slice(0, 4)})
            </Typography>
            <Typography color={colors.grey} fontStyle="oblique">
              {movieDetails?.tagline}
            </Typography>
            <Stack direction={"row"} p={1} m={1}>
              <Typography color={colors.white}>Status:</Typography>
              <Typography color={colors.grey}>
                {movieDetails?.status}
              </Typography>
              <Typography color={colors.white}>Release Date:</Typography>
              <Typography color={colors.grey}>
                {movieDetails?.release_date}
              </Typography>
              <Typography color={colors.white}>Length:</Typography>
              <Typography color={colors.grey}>
                {movieDetails?.runtime}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <HomePageFooter />
    </>
  );
}

import {
  Card,
  CardMedia,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCastInformationById, getMovieById } from "../services/ApiRequest";
import { colors } from "../styles/Colors";
import HomePageFooter from "../components/Footer";
import { useEffect, useState } from "react";
import { CastDetails, MovieDetails } from "../models/UpcomingMovie";
import CastCardDetails from "../components/CastCard";
import { scrollbar } from "../styles/ScrollBar";

const imageBaseUrl = "https://image.tmdb.org/t/p/original";

export default function MovieDetailedInformation() {
  const { movieId } = useParams();

  const parsedMovieId = movieId ? parseInt(movieId, 10) : 0;
  const movieService = useQuery({
    queryKey: ["get-movie"],
    queryFn: () => getMovieById({ movieId: parsedMovieId }),
    enabled: !!parsedMovieId,
  });
  const castService = useQuery({
    queryKey: ["get-cast-details"],
    queryFn: () => getCastInformationById({ movieId: parsedMovieId }),
    enabled: !!parsedMovieId,
  });

  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [castInformation, setCastInformation] = useState<CastDetails[]>(
    castService.data?.cast || []
  );
  useEffect(() => {
    if (movieService.data && castService.data) {
      setMovieDetails(movieService.data);
      setCastInformation(castService.data.cast);
    }
  }, [movieService.data, castService.data]);

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
          sx={{
            zIndex: 1,
            bgcolor: colors.primary,
            opacity: 0.9,
            // height: "100%",
          }}
        >
          <Stack direction="row">
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
            <Stack sx={{ width: "70%", py: "10%", pr: "10%" }}>
              <Typography
                color={colors.white}
                fontSize={26}
                fontFamily="cursive"
              >
                {movieDetails?.original_title}(
                {movieDetails?.release_date.slice(0, 4)})
              </Typography>
              <Typography color={colors.grey} fontFamily="monospace">
                {movieDetails?.tagline}
              </Typography>
              <Stack direction={"row"} pr={1}>
                {movieDetails?.genres.map((genre) => (
                  <Chip
                    label={genre.name}
                    size="small"
                    color="warning"
                    sx={{ m: 1 }}
                  />
                ))}
              </Stack>
              <Stack>
                <Typography
                  fontFamily="cursive"
                  color={colors.white}
                  fontSize={24}
                >
                  Overview
                </Typography>
                <Typography color={colors.white} fontFamily={"cursive"}>
                  {movieDetails?.overview}
                </Typography>
              </Stack>
              <Stack direction={"row"} p={1} m={1}>
                <Typography
                  color={colors.white}
                  fontWeight={600}
                  pr={2}
                  fontFamily="cursive"
                >
                  Status:
                </Typography>
                <Typography color={colors.grey} pr={1} fontFamily="monospace">
                  {movieDetails?.status}
                </Typography>
                <Typography
                  color={colors.white}
                  fontWeight={600}
                  pr={1}
                  fontFamily="cursive"
                >
                  Release Date:
                </Typography>
                <Typography color={colors.grey} pr={1} fontFamily="monospace">
                  {movieDetails?.release_date}
                </Typography>
                <Typography
                  color={colors.white}
                  fontWeight={600}
                  pr={1}
                  fontFamily="cursive"
                >
                  Length:
                </Typography>
                <Typography color={colors.grey} fontFamily="monospace">
                  {movieDetails?.runtime}
                </Typography>
              </Stack>
              <Divider sx={{ mr: 3, borderColor: colors.grey }} />
              <Stack direction={"row"} p={1} m={1}>
                <Typography
                  color={colors.white}
                  fontWeight={600}
                  pr={2}
                  fontFamily="cursive"
                >
                  Director:
                </Typography>
                <Typography color={colors.grey} pr={1} fontFamily="monospace">
                  {movieDetails?.vote_count}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack px={"10%"}>
            <Typography
              fontFamily="cursive"
              fontSize={24}
              color={colors.white}
              px={3}
            >
              Top Casts
            </Typography>
            <Stack direction={"row"} overflow="auto" sx={scrollbar}>
              {castInformation.map((cast) => (
                <Stack
                  key={cast.id}
                  style={{
                    flex: "0 0 15%", // Each component takes up 20% of the container width
                  }}
                >
                  <CastCardDetails data={cast} />
                </Stack>
                // <CastCardDetails data={cast} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* <HomePageFooter /> */}
    </>
  );
}

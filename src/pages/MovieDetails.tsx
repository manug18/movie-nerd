import { Card, CardMedia, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieById } from "../services/ApiRequest";
import { colors } from "../styles/Colors";
import HomePageFooter from "../components/Footer";

const imageBaseUrl = "https://image.tmdb.org/t/p/original"; // Replace with your image base URL

export default function MovieDetails() {
  const { movieId } = useParams();
  const parsedMovieId = movieId ? parseInt(movieId, 10) : 0; // Parse to number or leave it as undefined
  const movieService = useQuery({
    queryKey: ["get-movie"],
    queryFn: () => getMovieById({ movieId: parsedMovieId }), // Pass the parsed movieId
    enabled: !!parsedMovieId,
  });
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

          bgcolor: "rgba(100, 0, 255, 0.2)", // Adjust the color and opacity here
          height: "100vh",
          position: "relative",
        }}
        spacing={2}
      >
        <Stack
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "2rem",
            opacity: 1,
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" image={imageUrl} alt="green iguana" />
          </Card>
        </Stack>
        hello {movieService.data?.budget}
      </Stack>
      <HomePageFooter />
    </>
  );
}

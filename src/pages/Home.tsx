import { Stack, Typography } from "@mui/material";
import { colors } from "../styles/Colors";
import HomePageFooter from "../components/Footer";
import InformationCard from "../components/InformationCard";
import { useQuery } from "@tanstack/react-query";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/ApiRequest";
import { useEffect, useState } from "react";
import { Movie } from "../models/UpcomingMovie";
import { Console } from "console";

export default function Home() {
  const upcomingMovieService = useQuery(
    ["upcomingMovieData"],
    getUpcomingMovies
  );
  const popularMovieService = useQuery(["popularMovieData"], getPopularMovies);
  const topRatedMovieService = useQuery(
    ["topRatedMovieData"],
    getTopRatedMovies
  );

  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>(
    upcomingMovieService.data?.results || []
  );
  const [topMovies, setTopMovies] = useState<Movie[]>(
    topRatedMovieService.data?.results || []
  );

  const [popularMovies, setPopularMovies] = useState<Movie[]>(
    popularMovieService.data?.results || []
  );
  useEffect(() => {
    if (
      upcomingMovieService.data?.results &&
      popularMovieService.data?.results &&
      topRatedMovieService.data?.results
    ) {
      setUpcomingMovies(upcomingMovieService.data.results);
      setPopularMovies(popularMovieService.data.results);
      setTopMovies(topRatedMovieService.data.results);
    }
  }, [upcomingMovieService.data, popularMovieService.data]);

  console.log(upcomingMovies);

  return (
    <>
      <Stack bgcolor={colors.primary}>
        hellpo
        <Stack px={"10%"} py={"2vh"}>
          {" "}
          <Typography color={colors.white} fontSize={24}>
            Upcoming
            <Stack direction={"row"} m={3}>
              {upcomingMovies.slice(0, 4).map((movie) => (
                <InformationCard data={movie} />
              ))}
            </Stack>
          </Typography>
          <Typography color={colors.white} fontSize={24}>
            Whats Popular
            <Stack direction={"row"} m={3}>
              {popularMovies.slice(0, 4).map((movie) => (
                <InformationCard data={movie} />
              ))}
            </Stack>
          </Typography>
          <Typography color={colors.white} fontSize={24}>
            Top Rated{" "}
            <Stack direction={"row"} m={3}>
              {topMovies.slice(0, 4).map((movie) => (
                <InformationCard data={movie} />
              ))}
            </Stack>
          </Typography>
        </Stack>
      </Stack>
      <HomePageFooter />
    </>
  );
}

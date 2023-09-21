import { Stack, Typography } from "@mui/material";
import { colors } from "../styles/Colors";
import HomePageFooter from "../components/Footer";
import InformationCard from "../components/InformationCard";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../services/ApiRequest";
import { useState } from "react";
import { UpcomingMovie } from "../models/UpcomingMovie";

export default function Home() {
  const upcomingMovieService = useQuery(
    ["upcomingMovieData"],
    getUpcomingMovies
  );
  const [upcomingMovies, setUpcomingMovies] = useState<UpcomingMovie[]>(
    upcomingMovieService.data?.results || []
  );

  console.log(upcomingMovieService.data?.results);
  return (
    <>
      <Stack bgcolor={colors.primary} height={"80vh"}>
        hellpo
        <Stack px={"10%"} py={"2vh"}>
          {" "}
          <Typography color={colors.white} fontSize={24}>
            Upcoming
            {upcomingMovies.map((movie) => (
              <InformationCard data={movie} />
            ))}
            {/* <InformationCard data={upcomingMovies} /> */}
          </Typography>
          <Typography color={colors.white} fontSize={24}>
            Whats Popular
          </Typography>
        </Stack>
      </Stack>
      <HomePageFooter />
    </>
  );
}

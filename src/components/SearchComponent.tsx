import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { colors } from "../styles/Colors";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { SetStateAction, useEffect, useState } from "react";
import { getMoviesBySearch } from "../services/ApiRequest";
import { useQuery } from "@tanstack/react-query";

interface SearchProps {
  onMovieChange: (name: SetStateAction<string>) => void;
}

export default function SearchComponent({ onMovieChange }: SearchProps) {
  const [movieName, setMovieName] = useState<string>("");
  const handleMovieName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setMovieName(event.target.value);
    onMovieChange(event.target.value);
  };
  const getMovieList = () => {
    const movieListService = useQuery({
      queryKey: ["get-movie"],
      queryFn: () => getMoviesBySearch({ movieName: movieName }),
      enabled: !!movieName,
    });
  };

  //   useEffect(() => {
  //     if (movieListService.) {
  //       console.log(movieListService.data);
  //     }
  //   }, [movieListService.data]);
  return (
    <Stack height={"100%"}>
      <Typography
        fontFamily={"cursive"}
        fontSize={60}
        fontStyle={"inherit"}
        color={colors.white}
        textAlign={"center"}
      >
        Welcome to Movie Nerd
      </Typography>
      <Typography
        fontFamily={"cursive"}
        fontSize={20}
        fontStyle={"inherit"}
        color={colors.white}
        textAlign={"center"}
      >
        Lights ! Camera !! Search !!!
      </Typography>
      <Typography
        fontFamily={"cursive"}
        fontSize={20}
        fontStyle={"inherit"}
        textAlign={"center"}
        color={colors.white}
      >
        A one stop place for all your movies search
      </Typography>
      <TextField
        sx={{ bgcolor: colors.white, borderRadius: "20px" }}
        placeholder="Enter the movie you wants to search for"
        onChange={handleMovieName}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" color="primary" onClick={getMovieList}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}

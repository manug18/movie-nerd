import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { colors } from "../styles/Colors";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchComponent() {
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" color="primary">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}

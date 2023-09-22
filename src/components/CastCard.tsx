import { Avatar, Stack, Typography } from "@mui/material";
import { CastDetails } from "../models/UpcomingMovie";
import { colors } from "../styles/Colors";
interface MovieProps {
  data: CastDetails;
}

export default function CastCardDetails({ data }: MovieProps) {
  const imageUrl = `https://image.tmdb.org/t/p/original${data.profile_path}`;

  return (
    // <Stack>
    <>
      <Avatar
        src={imageUrl}
        sx={{
          height: "50%",
          width: "50%",
          p: "10%",
          justifyContent: "center",
          display: "flex",
          justifyItems: "center",
          borderRadius: "50%",
        }}
      />
      <Typography
        fontFamily="cursive"
        color={colors.white}
        textAlign={"center"}
        fontSize={20}
      >
        {data.name}
      </Typography>
      <Typography
        fontFamily="cursive"
        color={colors.grey}
        textAlign={"center"}
        fontSize={13}
      >
        {data.character.slice(0, 23)}
      </Typography>
    </>
  );
}

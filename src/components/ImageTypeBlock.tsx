import { Box } from "@mui/material";
import { percent, px } from "csx";
import { Type } from "src/models/Type";

interface Props {
  type: Type;
  size?: string | number;
}

export const ImageTypeBlock = ({ type, size = percent(100) }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: type.color,
        width: size,
        aspectRatio: "1/1",
        borderRadius: px(5),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={type.logo}
        style={{
          maxWidth: percent(80),
          aspectRatio: "inherit",
        }}
      />
    </Box>
  );
};

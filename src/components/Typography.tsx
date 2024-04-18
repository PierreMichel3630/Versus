import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Value } from "src/models/Value";
import { Colors } from "src/style/Colors";

interface Props {
  value: Value;
}
export const ResultBlock = ({ value }: Props) => {
  const { t } = useTranslation();
  const percent =
    value.win + value.lose > 0
      ? (value.win / (value.win + value.lose)) * 100
      : 0;
  return (
    <Box
      sx={{
        textShadow: "2px 2px 4px black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h2"
            component="span"
            sx={{ color: Colors.green }}
          >
            {value.win}
          </Typography>
          <Typography
            variant="h3"
            component="span"
            sx={{ color: Colors.green }}
          >
            {`  ${t("commun.win", { count: value.win })}`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h2" component="span" sx={{ color: Colors.red }}>
            {value.lose}
          </Typography>
          <Typography variant="h3" component="span" sx={{ color: Colors.red }}>
            {`  ${t("commun.defeat", { count: value.lose })}`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="h2">{percent.toFixed(2)}%</Typography>
    </Box>
  );
};

import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { Colors } from "src/style/Colors";
import { percent } from "csx";
import { useUser } from "src/context/UserProvider";

export interface ModePlay {
  label: string;
  value: string;
  tooltip: string;
}
export const SelectMode = () => {
  const { t } = useTranslation();
  const { playMode, setPlayMode } = useUser();

  const modes = [
    {
      label: t("mode.winstay.label"),
      tooltip: t("mode.winstay.tooltip"),
      value: "winstay",
    },
    {
      label: t("mode.random.label"),
      tooltip: t("mode.random.tooltip"),
      value: "random",
    },
  ];

  const [mode, setMode] = useState(
    playMode ? modes.find((el) => el.value === playMode) : modes[0]
  );

  useEffect(() => {
    if (mode) {
      setPlayMode(mode.value);
    }
  }, [mode, setPlayMode]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center">
          {modes.map((el) => (
            <Grid item key={el.value}>
              <Tooltip title={el.tooltip}>
                <Paper
                  sx={{
                    position: "relative",
                    p: 1,
                    border: "1px solid white",
                    cursor: "pointer",
                  }}
                  onClick={() => setMode(el)}
                >
                  <Typography variant="h4">{el.label}</Typography>
                  {mode && el.value === mode.value && (
                    <CheckCircleTwoToneIcon
                      sx={{
                        color: Colors.green2,
                        position: "absolute",
                        backgroundColor: "white",
                        borderRadius: percent(50),
                        top: 0,
                        right: 0,
                        transform: "translate(50%, -50%)",
                      }}
                    />
                  )}
                </Paper>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {mode && (
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="caption">* {mode.tooltip}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

import { IconButton } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useUser } from "src/context/UserProvider";
import { Colors } from "src/style/Colors";

export const ModeMenu = () => {
  const { mode, setMode } = useUser();
  return (
    <IconButton
      aria-label="light mode"
      color="inherit"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "light" ? (
        <LightModeIcon sx={{ fill: Colors.yellow, width: 40, height: 40 }} />
      ) : (
        <DarkModeIcon sx={{ fill: Colors.white, width: 40, height: 40 }} />
      )}
    </IconButton>
  );
};

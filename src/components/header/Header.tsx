import { AppBar, Box, Toolbar } from "@mui/material";
import { important, px } from "csx";

import { LanguagesMenu } from "./LanguageMenu";
import { ModeMenu } from "./ModeMenu";

import logo from "src/assets/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar id="toolbar" sx={{ p: important(px(0)), gap: px(8) }}>
          <Link to="/">
            <img src={logo} height={50} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <ModeMenu />
            <LanguagesMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

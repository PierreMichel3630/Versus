import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BarChartIcon from "@mui/icons-material/BarChart";
import BoltIcon from "@mui/icons-material/Bolt";
import { Colors } from "src/style/Colors";
import AppsIcon from "@mui/icons-material/Apps";

export const BottomNavigationBlock = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(location.pathname.split("/")[1]);

  useEffect(() => {
    setMenu(location.pathname.split("/")[1]);
  }, [location.pathname]);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={24}
    >
      <BottomNavigation
        showLabels
        value={menu}
        onChange={(_, newValue) => {
          setMenu(newValue);
        }}
      >
        <BottomNavigationAction
          value={""}
          label={t("commun.themes")}
          icon={<AppsIcon />}
          component={Link}
          to={"/"}
        />
        <BottomNavigationAction value={""} label={""} />
        <BottomNavigationAction
          value={"ranking"}
          label={t("commun.ranking")}
          icon={<BarChartIcon />}
          component={Link}
          to={"/ranking"}
        />
        <Box
          sx={{
            p: 1,
            backgroundColor: Colors.white,
            borderRadius: "50%",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -20%)",
            cursor: "pointer",
          }}
          onClick={() => navigate("/play")}
        >
          <Fab color="primary">
            <BoltIcon fontSize="large" sx={{ color: Colors.white }} />
          </Fab>
        </Box>
      </BottomNavigation>
    </Paper>
  );
};

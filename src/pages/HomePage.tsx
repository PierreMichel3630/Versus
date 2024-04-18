import { Container, Fab, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ScrollTop } from "src/components/ScrollTop";
import { Header } from "src/components/header/Header";
import { BottomNavigationBlock } from "src/components/BottomNavigation";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{`${t("pages.home.title")} - ${t("appname")}`}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: 8 }}>
            <Outlet />
          </Grid>
          <ScrollTop>
            <Fab size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Grid>
        <BottomNavigationBlock />
      </Container>
    </>
  );
};

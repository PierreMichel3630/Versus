import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { selectTypes } from "src/api/type";
import { CardSelectType } from "src/components/Card";
import { Type } from "src/models/Type";

export const ThemesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [types, setTypes] = useState<Array<Type>>([]);

  useEffect(() => {
    const getTypes = () => {
      selectTypes().then(({ data }) => {
        if (data) setTypes(data as Array<Type>);
      });
    };
    getTypes();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h1" textTransform="uppercase">
          {t("appname")}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h6">{t("description")}</Typography>
      </Grid>
      {types.map((t) => (
        <Grid item xs={3} sm={2} md={2} lg={1} key={t.id}>
          <CardSelectType
            type={t}
            onSelect={() => navigate(`/theme/${t.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

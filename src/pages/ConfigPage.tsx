import { Button, Grid, Typography } from "@mui/material";
import { px } from "csx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { selectTypes } from "src/api/type";
import { CardSelectType } from "src/components/Card";
import { SelectMode } from "src/components/SelectMode";
import { Type } from "src/models/Type";

export const ConfigPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [type, setType] = useState<Type | undefined>(undefined);
  const [types, setTypes] = useState<Array<Type>>([]);

  useEffect(() => {
    const getTypes = () => {
      selectTypes().then(({ data }) => {
        if (data) {
          const res = data as Array<Type>;
          setTypes(res);
          setType(res[0]);
        }
      });
    };
    getTypes();
  }, []);

  const launch = () => {
    if (type) {
      navigate(`/play/${type.id}`);
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h1" textTransform="uppercase">
          {t("commun.play")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <SelectMode />
      </Grid>
      {types.map((t) => (
        <Grid item xs={3} sm={2} md={2} lg={1} key={t.id}>
          <CardSelectType
            type={t}
            select={type && t.id === type.id ? true : false}
            onSelect={() => setType(t)}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{ borderRadius: px(50), p: 1 }}
          onClick={launch}
          fullWidth
        >
          <Typography variant="h2">{t("commun.launch")}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

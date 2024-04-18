import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { selectTypeById } from "src/api/type";
import { ImageTypeBlock } from "src/components/ImageTypeBlock";
import { JsonLanguageBlock } from "src/components/JsonLanguage";
import { RankingTable } from "src/components/table/RankingTable";
import { useUser } from "src/context/UserProvider";
import { Type } from "src/models/Type";
import { Colors } from "src/style/Colors";

export const ThemePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setPlayMode } = useUser();

  const [type, setType] = useState<Type | undefined>(undefined);

  useEffect(() => {
    const getType = () => {
      if (id) {
        selectTypeById(Number(id)).then(({ data }) => {
          if (data) setType(data as Type);
        });
      }
    };
    getType();
  }, [id]);

  const launch = (mode: string) => {
    setPlayMode(mode);
    if (type) {
      navigate(`/play/${type.id}`);
    }
  };

  return (
    <Grid container>
      {type && (
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: `url(${type.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            p: 1,
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <JsonLanguageBlock
                variant="h1"
                sx={{
                  textShadow: "2px 2px 4px black",
                  color: Colors.white,
                }}
                value={type.name}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={2}>
              <ImageTypeBlock type={type} />
            </Grid>
            <Grid
              item
              xs={9}
              sm={9}
              md={10}
              sx={{ display: "flex", gap: 1, flexDirection: "column" }}
            >
              <Button
                variant="contained"
                onClick={() => launch("random")}
                fullWidth
              >
                <Typography variant="h4">{t("commun.playrandom")}</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={() => launch("winstay")}
                fullWidth
              >
                <Typography variant="h4">{t("commun.playwinstay")}</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {id && (
        <Grid item xs={12} sx={{ mt: 2 }}>
          <RankingTable theme={Number(id)} title={t("commun.ranking")} />
        </Grid>
      )}
    </Grid>
  );
};

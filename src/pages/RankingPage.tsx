import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectTypes } from "src/api/type";
import { ImageTypeBlock } from "src/components/ImageTypeBlock";
import { JsonLanguageBlock } from "src/components/JsonLanguage";
import { RankingTable } from "src/components/table/RankingTable";
import { useUser } from "src/context/UserProvider";
import { Type } from "src/models/Type";

export const RankingPage = () => {
  const { t } = useTranslation();
  const { language } = useUser();

  const [type, setType] = useState<undefined | Type>(undefined);
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
      <Grid item xs={12}>
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {t("commun.ranking")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="themeinput"
          value={type}
          onChange={(_event: any, newValue: Type | null) => {
            if (newValue) setType(newValue);
          }}
          options={types}
          getOptionLabel={(option) => option.name[language.iso]}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              {...props}
            >
              <ImageTypeBlock type={option} size={50} />
              <JsonLanguageBlock value={option.name} />
            </Box>
          )}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("commun.theme")}
              placeholder={t("commun.selecttheme")}
            />
          )}
        />
      </Grid>
      {type && (
        <Grid item xs={12}>
          <RankingTable theme={type.id} />
        </Grid>
      )}
    </Grid>
  );
};

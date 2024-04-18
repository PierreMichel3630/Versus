import {
  Avatar,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";

import { padding, percent, px } from "csx";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectValueByTypeOrder } from "src/api/value";
import rank1 from "src/assets/rank/rank1.png";
import rank2 from "src/assets/rank/rank2.png";
import rank3 from "src/assets/rank/rank3.png";
import { Value } from "src/models/Value";
import { Colors } from "src/style/Colors";
import { JsonLanguageBlock } from "../JsonLanguage";

interface Props {
  theme: number;
  title?: string;
}
enum OrderType {
  percentwin = "percentwin",
  win = "win",
  lose = "lose",
  dontknow = "dontknow",
}

export const RankingTable = ({ title, theme }: Props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Array<Value>>([]);

  const ITEMPERPAGE = 25;

  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderType>(OrderType.percentwin);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState(0);
  const tabs: Array<{ label: string; order: OrderType }> = useMemo(
    () => [
      { label: t("commun.percentwin"), order: OrderType.percentwin },
      { label: t("commun.win"), order: OrderType.win },
      { label: t("commun.lose"), order: OrderType.lose },
      { label: t("commun.dontknow"), order: OrderType.dontknow },
    ],
    [t]
  );

  useEffect(() => {
    setData([]);
    setOrder(tabs[tab].order);
    setPage(0);
  }, [tab, tabs]);

  useEffect(() => {
    const getData = () => {
      selectValueByTypeOrder(Number(theme), page, ITEMPERPAGE, order).then(
        ({ data }) => {
          if (data) {
            setData((prev) =>
              page === 0
                ? (data as Array<Value>)
                : [...prev, ...(data as Array<Value>)]
            );
            setIsLoading(false);
          }
        }
      );
    };
    getData();
  }, [theme, page, order]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isLoading &&
        window.innerHeight + Math.round(window.scrollY) >=
          document.body.offsetHeight
      ) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const getIcon = (rank: number) => {
    let icon = (
      <Avatar sx={{ bgcolor: Colors.grey, width: 30, height: 30 }}>
        <Typography variant="h6" color="text.primary">
          {rank}
        </Typography>
      </Avatar>
    );
    switch (rank) {
      case 1:
        icon = <img src={rank1} width={30} />;
        break;
      case 2:
        icon = <img src={rank2} width={30} />;
        break;
      case 3:
        icon = <img src={rank3} width={30} />;
        break;
    }
    return icon;
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          {title && (
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                {title}
              </Typography>
            </Grid>
          )}
          <Tabs
            value={tab}
            onChange={(_event: React.SyntheticEvent, newValue: number) =>
              setTab(newValue)
            }
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            sx={{ minHeight: "auto" }}
          >
            {tabs.map((value, index) => (
              <Tab
                key={index}
                sx={{ p: padding(8, 5), minHeight: "auto" }}
                label={
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "uppercase",
                    }}
                  >
                    {value.label}
                  </Typography>
                }
              />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: Colors.grey,
            width: percent(100),
            borderTopLeftRadius: px(0),
            borderTopRightRadius: px(0),
          }}
        >
          <Table size="small">
            <TableBody>
              {data.map((el, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ p: px(4) }}>
                    {getIcon(index + 1)}
                  </TableCell>
                  <TableCell sx={{ p: px(4) }}>
                    {el.image && <Avatar src={el.image} />}
                  </TableCell>
                  <TableCell align="left" sx={{ p: px(4) }}>
                    <JsonLanguageBlock value={el.name} />
                  </TableCell>
                  <TableCell align="right" sx={{ p: px(4) }}>
                    <Typography variant="h2">
                      {Number(el[order]).toFixed(0)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

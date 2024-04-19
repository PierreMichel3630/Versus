import { Box, Button, Container, Typography } from "@mui/material";
import { percent, px, viewHeight } from "csx";
import { Colors } from "src/style/Colors";

import BoltIcon from "@mui/icons-material/Bolt";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { selectValueByType, updateValueById } from "src/api/value";
import { JsonLanguageBlock } from "src/components/JsonLanguage";
import { ResultBlock } from "src/components/Typography";
import { Value } from "src/models/Value";

import CloseIcon from "@mui/icons-material/Close";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { ButtonColor } from "src/components/Button";
import { useUser } from "src/context/UserProvider";

export const PlayPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { playMode } = useUser();

  const color1 = Colors.pink;
  const color2 = Colors.blue;

  const [vote, setVote] = useState<undefined | Value>(undefined);
  const [value1, setValue1] = useState<undefined | Value>(undefined);
  const [value2, setValue2] = useState<undefined | Value>(undefined);

  useEffect(() => {
    if (id) {
      selectValueByType(Number(id), 2).then(({ data }) => {
        if (data) {
          setValue1(data[0]);
          setValue2(data[1]);
        }
      });
    }
  }, [id]);

  const onVote = async (win?: Value, lose?: Value) => {
    if (win && lose) {
      updateValueById({
        id: win.id,
        win: true,
        lose: false,
        dontknow: false,
      }).then(({ data }) => {
        if (value1 && win.id === value1.id) {
          setValue1(data);
        } else if (value2 && win.id === value2.id) {
          setValue2(data);
        }
      });
      await updateValueById({
        id: lose.id,
        win: false,
        lose: true,
        dontknow: false,
      }).then(({ data }) => {
        if (value1 && lose.id === value1.id) {
          setValue1(data);
        } else if (value2 && lose.id === value2.id) {
          setValue2(data);
        }
      });
    }
    setVote(win);
  };

  const goToHome = () => {
    navigate("/");
  };
  const next = () => {
    setVote(undefined);
    if (playMode === "winstay") {
      selectValueByType(Number(id), 1).then(({ data }) => {
        if (data) {
          if (value1 && vote && vote.id === value1.id) {
            setValue2(data[0]);
          } else if (value2 && vote && vote.id === value2.id) {
            setValue1(data[0]);
          }
        }
      });
    } else if (playMode === "random") {
      selectValueByType(Number(id), 2).then(({ data }) => {
        if (data) {
          setValue1(data[0]);
          setValue2(data[1]);
        }
      });
    }
  };

  const dontKnow = async (value: Value) => {
    await updateValueById({
      id: value.id,
      win: false,
      lose: false,
      dontknow: true,
    });
    selectValueByType(Number(id), 1).then(({ data }) => {
      if (data) {
        if (value1 && value.id === value1.id) {
          setValue1(data[0]);
        } else if (value2 && value.id === value2.id) {
          setValue2(data[0]);
        }
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          width: percent(100),
          height: viewHeight(100),
          position: "relative",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 1 0%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              sx={{
                backgroundColor: color1,
                height: percent(50),
                width: percent(100),
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
                p: 2,
                borderBottom: "2px solid white",
                backgroundImage: value1 ? `url(${value1.image})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => !vote && onVote(value1, value2)}
            >
              {value1 && (
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                  <JsonLanguageBlock
                    variant="h1"
                    sx={{
                      color: Colors.white,
                      textShadow: "2px 2px 4px black",
                    }}
                    value={value1.name}
                  />
                  {vote ? (
                    <ResultBlock value={value1} />
                  ) : (
                    <Box>
                      <Button
                        variant="contained"
                        sx={{ borderRadius: px(50) }}
                        onClick={(event) => {
                          event.stopPropagation();
                          dontKnow(value1);
                        }}
                      >
                        <Typography variant="h6">
                          {t("commun.notknow")}
                        </Typography>
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: percent(50),
                left: percent(50),
                translate: "-50% -55%",
                borderRadius: percent(100),
                m: 1,
                border: `5px solid ${Colors.white}`,
              }}
            >
              <Box
                sx={{
                  borderRadius: percent(50),
                  width: 80,
                  height: 80,
                  bgcolor: Colors.black,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BoltIcon sx={{ fontSize: 50, color: Colors.white }} />
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: color2,
                height: percent(50),
                width: percent(100),
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
                p: 2,
                borderTop: "2px solid white",
                backgroundImage: value2 ? `url(${value2.image})` : "none",
                backgroundPosition: "center",
                backgroundSize: "cover",
                cursor: "pointer",
                textAlign: "center",
              }}
              onClick={() => !vote && onVote(value2, value1)}
            >
              {value2 && (
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                  <JsonLanguageBlock
                    variant="h1"
                    sx={{
                      color: Colors.white,
                      textShadow: "2px 2px 4px black",
                    }}
                    value={value2.name}
                  />
                  {vote ? (
                    <ResultBlock value={value2} />
                  ) : (
                    <Box>
                      <Button
                        variant="contained"
                        sx={{ borderRadius: px(50) }}
                        onClick={(event) => {
                          event.stopPropagation();
                          dontKnow(value2);
                        }}
                      >
                        <Typography variant="h6">
                          {t("commun.notknow")}
                        </Typography>
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1, p: 1 }}>
            <ButtonColor
              value={Colors.red}
              label={t("commun.quit")}
              icon={CloseIcon}
              variant="contained"
              onClick={goToHome}
            />
            {vote && (
              <ButtonColor
                value={Colors.green}
                label={t("commun.next")}
                icon={SkipNextIcon}
                variant="contained"
                onClick={next}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

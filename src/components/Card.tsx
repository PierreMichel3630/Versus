import { Type } from "src/models/Type";
import { Box } from "@mui/material";
import { percent, px } from "csx";
import { Colors } from "src/style/Colors";
import { JsonLanguageBlock } from "./JsonLanguage";

import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { ImageTypeBlock } from "./ImageTypeBlock";

interface PropsCardSelectType {
  type: Type;
  select?: boolean;
  onSelect: () => void;
}

export const CardSelectType = ({
  type,
  onSelect,
  select = false,
}: PropsCardSelectType) => {
  return (
    <Box
      onClick={() => onSelect()}
      sx={{
        width: percent(100),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        p: px(5),
        background: "rgba(255,255,255,.15)",
        borderRadius: px(5),
        gap: px(5),
        position: "relative",
      }}
    >
      {select && (
        <CheckCircleTwoToneIcon
          sx={{
            color: Colors.green2,
            position: "absolute",
            backgroundColor: "white",
            borderRadius: percent(50),
            top: 0,
            right: 0,
            transform: "translate(30%, -30%)",
          }}
        />
      )}
      <ImageTypeBlock type={type} />
      <JsonLanguageBlock
        variant="h6"
        sx={{ textAlign: "center" }}
        value={type.name}
      />
    </Box>
  );
};

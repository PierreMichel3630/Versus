import { Button, ButtonProps, SvgIcon, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { important, px } from "csx";
import { ElementType } from "react";
import { Colors } from "src/style/Colors";

interface Props extends ButtonProps {
  value: string;
  label: string;
  icon: ElementType;
  typography?: Variant | "inherit";
  variant?: "text" | "outlined" | "contained";
}

export const ButtonColor = ({
  icon,
  value,
  label,
  typography = "h4",
  variant = "outlined",
  ...props
}: Props) => {
  const style =
    variant && variant === "outlined"
      ? {
          color: value,
          borderColor: value,
          borderWidth: 2,
          backgroundColor: Colors.white,
          "&:hover": {
            backgroundColor: value,
            color: Colors.white,
          },
        }
      : {
          backgroundColor: value,
          color: Colors.white,
          border: `2px solid ${value}`,
          "&:hover": {
            backgroundColor: Colors.white,
            color: value,
          },
        };
  return (
    <Button
      variant={variant}
      fullWidth
      sx={style}
      {...props}
      startIcon={
        <SvgIcon
          component={icon}
          inheritViewBox
          sx={{ fontSize: important(px(25)) }}
        />
      }
    >
      <Typography variant={typography}>{label}</Typography>
    </Button>
  );
};

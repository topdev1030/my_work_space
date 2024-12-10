import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chart: {
    "& canvas": {
      height: 320,
      width: "100%",
    },
  },
}));

export { useStyles };

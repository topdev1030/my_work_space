import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  footerStyle: {
    textAlign: "center",
    backgroundColor: "#1C1C1C",
    position: "relative",
    bottom: 0,
    width: "100%",
    height: "70px",
    "&.ant-layout-footer": {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: "#6B6B6B",
    },
    alignSelf: "center",
    marginLeft: 235,
  },
}));

export { useStyles };

import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerStyle: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    height: 48,
    paddingInline: 10,
    lineHeight: "70px",
    backgroundColor: "#1C1C1C",
  },
  title: {
    "&.ant-typography": {
      marginBottom: "0 !important",
      fontFamily: "Poppins-Medium",
      fontSize: 30,
    },
  },
  searchBar: {
    width: 300,
    borderRadius: "10px",
    border: 0,
    height: 48,
    backgroundColor: "#282937",
    color: "#6B6B6B",
  },
}));

export { useStyles };

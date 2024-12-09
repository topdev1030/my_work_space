import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const tableStyles = createUseStyles((theme: Theme) => ({
  highColor: {
    borderColor: "#FF7B23",
    color: "#FF7B23",
  },
  mediumColor: {
    borderColor: "#F7FF5F",
    color: "#F7FF5F",
  },
  noColor: {
    borderColor: "#6B6B6B",
    color: "#6B6B6B",
  },
  tagStyle: {
    border: "1px solid",
    borderRadius: "16px",
    padding: "2px 0px",
    backgroundColor: "inherit",
    width: "100%",
    textAlign: "center",
    marginInlineEnd: 0,
  },
  innerTagStyle: {
    width: 18,
    height: 20,
    borderRadius: 4,
    borderColor: "8E8E8E",
    padding: "0 2px",
  },
  tableContainer: {
    "& .ant-pagination": {
      display: "none",
    },
  },
}));

export { tableStyles };

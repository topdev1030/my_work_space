import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

export const useStyles = createUseStyles((theme: Theme) => ({
  input_field_primary: {
    width: "100%",
    height: 48,
    backgroundColor: "#282937",
    borderRadius: 10,
    "&.ant-typography": {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#6B6B6B",
    },
  },
  selectbox_field_primary: {
    width: "100%",
    height: 48,
    "& .ant-select-selector": {
      border: "1px solid #424242 !important",
      borderRadius: 8,
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#8E8E8E",
      backgroundColor: "#282937 !important",
    },
  },
  searchBtn: {
    width: "100%",
    height: 48,
    border: 0,
    borderRadius: 10,
    backgroundColor: "#498DCE",
    "& .ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: "#FFF",
    },
  },
  clearBtn: {
    width: "100%",
    border: "1px solid",
    borderColor: "#498DCE",
    height: 48,
    borderRadius: 10,
    backgroundColor: "transparent",
    "& .ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: "#498DCE",
    },
  },

  input_field_secondary: {
    width: "100%",
    height: 48,
    backgroundColor: "#282937",
    borderRadius: 10,
    "&.ant-typography": {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#6B6B6B",
    },
  },
  selectbox_field_secondary: {
    width: "100%",
    height: 48,
    "& .ant-select-selector": {
      border: "none !important",
      borderRadius: 8,
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#8E8E8E",
      backgroundColor: "#282937 !important",
    },
  },
  btn_text: {
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: "#FFF",
    },
  },
}));

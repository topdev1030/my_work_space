import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chart: {
    "& canvas": {
      height: 285,
      width: 300,
    },
  },
  popupcontainer: {
    padding: 0,
    "& .ant-popover-inner": {
      backgroundColor: "#000000",
      borderRadius: "14px"
    }
  },
  searchInput: {
    border: "none",
    outline: "none",
    backgroundColor: "#282937",
    height: "48px",
  },

  list_container: {
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#498DCE transparent", // Firefox
    "&::-webkit-scrollbar": {
      width: "6px",
      height: "26px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#498DCE",
      borderRadius: "10px",
      border: "2px solid transparent",
    },
    "& .ant-list-items": {
      paddingRight: "23px",
    }
  },
  list_item: {
    backgroundColor: "#282937",
    borderRadius: "10px",
    border: "none",
    borderBlockEnd: "none !important",
    paddingLeft: "14px !important",
    color: "#8E8E8E",
    "& + &": {
      marginTop: "8px",
    },
  },
  search_form_item_row: {
    "& .ant-form-item-row .ant-form-item-label label::first-letter": {
      textTransform: "uppercase !important",
    },
  },
}));

export { useStyles };

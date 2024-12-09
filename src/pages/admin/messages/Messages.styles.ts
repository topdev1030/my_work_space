import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1C1C1C",
    minHeight: "calc(100vh - 70px)",
    position: "relative",
    padding: "24px 24px 0 24px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 30,
      color: "#FFF",
    },
  },
  content: {
    marginTop: 30,
  },
  cardContent: {
    marginTop: 15,

    "& .ant-pagination": {
      ". ant-pagination-options": {
        display: "none",
      },
    },
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "35px",
  },
  panelTitle: {
    "&.ant-typography": {
      fontFamily: "Poppins-ExtraLight",
      fontSize: 20,
      color: "#FFF",
      marginBottom: 20,
    },
  },
  searchOptionContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "end",
  },
  fieldTitle: {
    "&.ant-typography": {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#8E8E8E",
    },
  },
  searchField: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  searchText: {
    marginBottom: 5,
  },
  searchBar: {
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
  selectBar: {
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
  OptionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  optionTitle: {
    "&.ant-typography": {
      fontFamily: "Poppins-ExtraLight",
      fontSize: 20,
      color: "#FFF",
    },
  },
  sortContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  sortTitle: {
    marginBottom: "0 !important",
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      color: "#6B6B6B",
    },
  },
  sortBar: {
    width: "70%",
    height: 22,

    "& > .ant-select-selector": {
      border: "0 !important",
      backgroundColor: "transparent !important",
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      color: "#498DCE",
    },

    "& .anticon-down": {
      color: "#498DCE",
    },

    "& > div > div >.ant-select-selection-placeholder": {
      insetInlineEnd: "0 !important",
    },
  },
  viewIconContainer: {
    "& .ant-image": { display: "flex", float: "inline-end", marginRight: 10 },
  },
  viewIcon: {},
  createMessageBtn: {
    height: 40,
    backgroundColor: "#498DCE",
    border: 0,
    borderRadius: 10,
  },
  createBtn: {
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: "#FFF",
    },
  },
  messagesTable: {
    flex: 1,
    "& .ant-table": {
      "& th, & td": {
        fontFamily: "poppins-medium",
        fontSize: 13,
        color: theme.colors.colorText,
        fontWeight: 400,
      },
      "& th": {
        color: "#8E8E8E !important",
      },
      "& tr > td": {
        borderBottom: "16px solid #1C1C1C",
        borderRed: "16px solid #1C1C1C",
      },
      "& th .ant-dropdown-open": {
        visibility: "hidden",
      },
      "& tr > th": {
        fontSize: 13,
        fontFamily: "poppins-medium",
        color: theme.colors.colorText,
        fontWeight: 400,
        backgroundColor: "#1C1C1C",
      },
    },
    "& .ant-pagination": {
      "& .ant-pagination-options": {
        display: "none !important",
      },
      "& .ant-pagination-item": {
        border: "1px solid #498dce",
        borderRight: 0,
        borderRadius: 0,
        marginInlineEnd: 0,
        padding: "20px 0",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#1C1C1C",
      },
      "& .ant-pagination-item-active > a": {
        color: "#000",
        backgroundColor: "#498dce",
      },
      "& .ant-pagination-item > a": {
        padding: "5px 13px",
      },
      "& .ant-pagination-prev": {
        fontFamily: "poppins-medium",
        display: "flex",
        border: "1px solid #498dce",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
        padding: "20px 10px",
        alignItems: "center",
        marginInlineEnd: 0,
        color: "#498dce",
      },
      "& .ant-pagination-jump-next": {
        border: "1px solid #498dce",
        borderRight: 0,
        borderRadius: 0,
        marginInlineEnd: 0,
        padding: "20px 0",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#1C1C1C",
      },
      "& .ant-pagination-next": {
        border: "1px solid #498dce",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: "20px 20px",
        alignItems: "center",
        justifyContent: "end",
        display: "flex",
        color: "#498dce",
        fontFamily: "poppins-medium",
      },
      "& .ant-pagination-item-link-icon": {
        padding: "0 9px",
      },
      "& .ant-pagination-item-ellipsis": {
        padding: "0 5px",
      },
      "& .ant-pagination-jump-prev": {
        border: "1px solid #498dce",
        borderRight: 0,
        borderRadius: 0,
        marginInlineEnd: 0,
        padding: "20px 0",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#1C1C1C",
      },
    },
  },
  tdStyleEven: {
    backgroundColor: "#000000",
  },
  tdStyleOdd: {
    backgroundColor: "#272727",
  },
  cardPagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: 10,

    "& .ant-pagination": {
      "& .ant-pagination-item": {
        border: "1px solid #498dce",
        borderRight: 0,
        borderRadius: 0,
        marginInlineEnd: 0,
        padding: "20px 0",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#1C1C1C",
      },
      "& .ant-pagination-item-active > a": {
        color: "#000",
        backgroundColor: "#498dce",
      },
      "& .ant-pagination-item > a": {
        padding: "5px 13px",
      },
      "& .ant-pagination-prev": {
        display: "flex",
        border: "1px solid #498dce",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
        padding: "20px 10px",
        alignItems: "center",
        marginInlineEnd: 0,
        color: "#498dce",
      },
      "& .ant-pagination-jump-next": {
        border: "1px solid #498dce",
        borderRight: 0,
        borderRadius: 0,
        marginInlineEnd: 0,
        padding: "20px 0",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#1C1C1C",
      },
      "& .ant-pagination-next": {
        border: "1px solid #498dce",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: "20px 20px",
        alignItems: "center",
        justifyContent: "end",
        display: "flex",
        color: "#498dce",
      },
      "& .ant-pagination-item-link-icon": {
        padding: "0 9px",
      },
      "& .ant-pagination-item-ellipsis": {
        padding: "0 5px",
      },
      "& .ant-pagination-jump-prev": {
        border: "1px solid #498dce",
        borderRight: 0,
        borderRadius: 0,
        marginInlineEnd: 0,
        padding: "20px 0",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#1C1C1C",
      },
    },
  },
  cardContainer: {
    backgroundColor: "#1c1c1e",
    color: "#fff",
    borderRadius: 10,

    "& .ant-card-body": {
      padding: "16px 8px",

      "& .ant-divider-horizontal": {
        margin: "10px 0",
      },

      "& .ant-space-gap-row-small": {
        rowGap: 0,
      },
    },
  },
  tdIconStyle: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  messagePdfCol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  messageFileDragger: {
    "& .ant-upload-drag-container": {
      display: "flex",
      flexDirection: "column",
    },
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.45)",
    fontWeight: 400,
    fontSize: 10,
    fontFamily: "'Poppins-Regular'",
  },
  card_text_space: {
    width: "100%",
    overflow: "hidden",
  },
  value: {
    color: "#FFF",
    fontWeight: 500,
    fontSize: 12,
    fontFamily: "'Poppins-Regular'",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginBottom: 0,
  },
  createMessageModal: {
    width: "fit-content !important",
    "& .ant-modal-content": {
      width: 540,
      padding: 20,
      backgroundColor: "#141414 !important",
      borderRadius: 20,
    },
    "& .ant-modal-header": {
      color: "#8E8E8E",
      backgroundColor: "#141414 !important",
    },
  },
  createMessageForm: {
    "& input, & input.form-control": {
      width: "100%",
      height: 50,
      backgroundColor: "#282937 !important",
    },
    "& .ant-select-single": {
      height: "50px !important",
    },
    "& .ant-select-selector": {
      border: "1px solid #424242 !important",
      borderRadius: 8,
      backgroundColor: "#282937 !important",
    },
  },
  formTitle: {
    "&.ant-typography": {
      textAlign: "start",
      fontWeight: 600,
      fontSize: 24,
      textTransform: "none",
      marginBottom: 20,
    },
  },
  formActions: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    gap: 20,
    "& > button": {
      flex: 1,
      height: 50,
      fontSize: 16,
    },
  },
  pdfPreviewModal: {
    width: "fit-content",
    "& > .ant-modal-content": {
      width: 612,
      padding: 0,
      background: "none",
      border: "none",
      borderRadius: 20,
      "& > .ant-modal-close": {
        right: -28,
        top: 0,
      },
    },
  },
  invisible: {
    visibility: "hidden",
  },
}));

export { useStyles };

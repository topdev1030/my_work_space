import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  rightBar: {
    width: "400px",
    display: "block",
    padding: "20px 10px 10px 20px",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  feedContainer: {
    position: "absolute",
    height: 65,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  feedHeadline: {
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: "#8E8E8E",
    },
  },
  feedTitle: {
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 16,
      color: "#FFF",
    },
  },
  newsItems: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  newsContainer: {
    overflow: "auto",
    maxHeight: "calc(100vh - 100px)",
    minWidth: "347px",
    marginTop: 65,
    paddingRight: 20,
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
  },
  newsCard: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "#282937",
    "& > .ant-card-body": {
      padding: 10,
      transition: "transform 0.3s ease-in-out",
    },
    "& > .ant-card-body:hover": {
      backgroundColor: "#43455c",
      transform: "scale(1.01)",
      borderRadius: 20,
    },
  },
  newsCardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  newsDescription: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    alignSelf: "start",
    marginLeft: 5,
    marginTop: 10,
  },
  cardContainer: {
    display: "flex",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 15,
  },
  newsImage: {
    objectFit: "cover",
    border: 0,
    borderRadius: 20,
  },
  newsTitle: {
    textAlign: "start",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    marginBottom: 0,
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: "#FFF",
    },
  },
  newsDate: {
    textAlign: "start",
    "&.ant-typography": {
      fontFamily: "Poppins-Regular",
      fontSize: 12,
      color: "#8E8E8E",
    },
  },
}));

export { useStyles };

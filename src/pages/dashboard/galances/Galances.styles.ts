import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  galanceContainer: {
    marginTop: 30,
    marginBottom: 15,
  },
  galanceCard: {
    borderRadius: "30px",
    width: "100%",
    height: 170,
    cursor: "auto",
    "& .ant-card-body": {
      padding: "15px 24px 10px 24px",
    },
  },
  galanceSubTitle: {
    fontFamily: "poppins-medium",
    marginBottom: 8,
    color: "#000",
  },
  galanceValue: {
    fontFamily: "poppins-medium",
    fontSize: 40,
    color: "#000",
  },
  galanceViewAll: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    cursor: "pointer",
  },
  viewAllIcon: {
    transform: "rotate(-45deg)",
    color: "#000",
  },
  galanceTitle: {
    fontFamily: "poppins-medium",
    color: "#6B6B6B",
    marginLeft: 5,
  },
  galanceCardTitle: {
    "&.ant-typography": {
      fontFamily: "poppins-medium",
      textAlign: "start",
      marginTop: 5,
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.3,
      color: "#1C1C1C",
    },
  },
}));

export { useStyles };

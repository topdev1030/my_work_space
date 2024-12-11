import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  siderStyle: {
    width: "235px !important",
    maxWidth: "235px !important",
    minWidth: "235px !important",
    top: 0,
    left: 0,
    height: "100%",
    position: "fixed",
    zIndex: 10,
    "& .ant-layout-sider-children": {
      flexDirection: "column",
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
      lineHeight: "120px",
      backgroundColor: "#000",
    },
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    cursor: "pointer",
    marginTop: 22,
    marginRight: "20%",
    marginBottom: 25,
    marginLeft: 30,
  },
  logoImg: {
    width: "83%",
    alignSelf: "start",
  },
  logoTitle: {
    "&.ant-typography": {
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      color: "#6B6B6B",
      alignSelf: "start",
    },
  },
  profileCardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 30,
    marginRight: "20%",
    marginLeft: 20,
  },
  imgAvatar: {
    margin: 0,
    border: 0,
    borderRadius: 100,
  },
  cardDescription: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardGreetings: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#FFFFFF",
  },
  cardProfileName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: "10px !important",
    marginBottom: "0px !important",
  },
  cardContact: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#6B6B6B",
  },
  svgIcon: {
    fontSize: "30px !important",
    marginLeft: 2.5,
    marginRight: 2.5,
  },
  menuItem: {
    background: "transparent",
    "& .ant-menu-item": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: "55px",
      color: "#6B6B6B",
      borderRadius: 0,
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      transition: "color 0.1s ease",
    },
    "& .ant-menu-item > .ant-image": {
      width: "35px !important",
      height: "35px, !important",
    },
    "& .ant-menu-item > .ant-menu-title-content": {
      marginInlineStart: "0 !important",
      textAlign: "start",
      paddingLeft: 20,
    },
    "& .ant-menu-item a": {
      fontSize: 12,
      textDecoration: "none",
      color: "inherit",
    },
    "& .ant-menu-item:hover": {
      color: "#C38A39",
      background: "transparent !important",
    },
    "& .ant-menu-item:hover a": {
      color: "#C38A39",
    },
    "& .ant-menu-item:hover svg": {
      color: "#C38A39",
    },
    "& .ant-menu-item-selected": {
      position: "relative",
      fontWeight: "bold",
      color: "#C38A39",
      background: "transparent",
    },
    "& .ant-menu-item-selected a": {
      color: "#C38A39",
    },
    "& .ant-menu-item-selected a::before": {
      content: "",
      position: "absolute",
      left: 0,
      top: 4,
      bottom: 4,
      width: 4,
      borderRadius: 2,
      backgroundColor: "#C38A39",
    },
    "& .ant-menu-item img": {
      transition: "filter 0.1s ease",
    },
    "& .ant-menu-item:hover img": {
      filter: `
        brightness(0.8) 
        sepia(1) 
        hue-rotate(0deg) 
        saturate(3) 
        contrast(1.1)
      `, // Hover color effect to #C38A39
    },
    "& .ant-menu-item-selected img": {
      filter: `
        brightness(0.8) 
        sepia(1) 
        hue-rotate(0deg) 
        saturate(3) 
        contrast(1.1)
      `, // Selected state with #C38A39
    },
  },
  logoutIcon: {
    height: "55px !important",
    display: "flex",
    alignItems: "center",
    position: "fixed",
    left: 28,
    bottom: 0,
    marginBottom: 20,
    cursor: "pointer",
  },
  logoutTitle: {
    textAlign: "start",
    "&.ant-typography": {
      fontFamily: "Poppins-Medium",
      fontSize: 12,
      color: "#6B6B6B",
      transition: "color 0.3s ease", // Smooth color transition
    },
    "&.ant-typography:hover": {
      color: "#C38A39",
    },
  },
  bottomMenuItem: {
    marginBottom: 20,
  },
}));

export { useStyles };

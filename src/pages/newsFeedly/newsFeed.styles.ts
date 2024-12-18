import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	rightBar: {
		position: "fixed",
		height: "100%",
		right: 0,
		width: "400px",
		display: "block",
		padding: "20px 10px 10px 20px",
		alignItems: "center",
		backgroundColor: theme.colors.colorSiderRightBG,
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
			color: theme.colors.colorFormSelectColor,
		},
	},
	feedTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: theme.colors.colorFontTitle,
		},
	},
	newsItems: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		cursor: "pointer",
	},
	newsContainer: {
		overflowY: "scroll",
		maxHeight: "calc(100vh - 100px)",
		minWidth: "347px",
		marginTop: 65,
		paddingRight: 20,
		"&::-webkit-scrollbar": {
			width: "16px",
		},
		"&::-webkit-scrollbar-thumb": {
			borderRadius: "10px",
			backgroundColor: "#498DCE",
			border: "4px solid transparent",
			backgroundClip: "padding-box",
		},
	},
	newsCard: {
		width: "100%",
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: 20,
		marginBottom: 15,
		border: 0,
		backgroundColor: theme.colors.colorCardBG,
		"& > .ant-card-body": {
			padding: 10,
			transition: "transform 0.3s ease-in-out",
		},
		"& > .ant-card-body:hover": {
			backgroundColor: theme.colors.colorBgHover,
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
			color: theme.colors.colorFontTitle,
		},
	},
	newsDate: {
		textAlign: "start",
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: theme.colors.colorFormSelectColor,
		},
	},
}));

export { useStyles };

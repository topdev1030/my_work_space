import { createUseStyles } from "react-jss";
import alpha from "color-alpha";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	lineCardContainer: {
		marginBottom: 15,
		marginTop: 15,
	},
	statsPanel: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		gap: 40,
		marginLeft: 20,
		marginRight: 20,
	},
	headingCard: {
		width: 360,
		height: "auto",
		border: "none",
		"& > .ant-card-body": {
			padding: "20px 10px",
		},
	},
	headingCardDesc: {
		"&.ant-typography": {
			color: alpha(theme.colors.colorBrandWhite, 0.59),
			fontSize: 16,
			lineHeight: "1.3em",
			fontWeight: 400,
		},
	},
	headingCardTitle: {
		"&.ant-typography": {
			fontSize: 32,
			fontWeight: 600,
			lineHeight: "1.1em",
			color: theme.colors.colorBrandWhite,
		},
	},
	dashboardRgithboxbgColor: {
		backgroundColor: "#141414",
	},
	tableTitle: {
		color: theme.colors.colorFontTitle,
		fontWeight: "500 !important",
	},
}));

export { useStyles };

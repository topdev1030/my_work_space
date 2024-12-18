import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	statsContainer: {
		marginTop: "15px",
		"& .ant-card": {
			height: 250,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			transition: "transform 0.3s ease-in-out",
		},
		"& .ant-card:hover": {
			transform: "scale(1.02)",
		},
		"& .ant-card-body": {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-start",
			width: "100%",
			padding: "0 40px",
			"&::before": {
				content: "none",
			},
			"&::after": {
				content: "none",
			},
		},
	},
	statsCard: {
		borderRadius: 60,
		textAlign: "start",
	},
	chatterStatsCard: {
		"& h1": {
			textTransform: "capitalize",
		},
	},
	statsIcon: {
		"& > svg": {
			width: "auto",
			height: 42,
		},
	},
	statsTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-SemiBold",
			fontSize: 60,
			color: theme.colors.colorFontTitle,
			marginBottom: "auto",
		},
	},
	statsValue: {
		"&.ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 20,
			color: "#6B6B6B",
		},
	},
	statsSup: {
		paddingLeft: 8,
		fontWeight: 400,
		fontSize: 24,
	},
	statsTextSuccess: {
		color: theme.colors.colorSuccess,
	},
	statsTextDanger: {
		color: theme.colors.colorError,
	},
	statsTextInfo: {
		color: theme.colors.colorBrandBlue200,
	},
	statsTextOrange: {
		color: "#F7FF5F",
	},
	statsTextWarning: {
		color: theme.colors.colorBrandYellow200,
	},
	...theme.animations,
	chatterContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "start",
	},
}));

export { useStyles };

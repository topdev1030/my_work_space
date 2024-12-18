import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	headerStyle: {
		textAlign: "center",
		color: theme.colors.colorFontTitle,
		height: 64,
		paddingInline: 48,
		lineHeight: "64px",
		backgroundColor: "#4096ff",
	},
	contentStyle: {
		textAlign: "start",
		minHeight: 120,
		backgroundColor: theme.colors.colorPrimaryBg,
		display: "flex",
		flexDirection: "column",
		color: theme.colors.colorTextGray,
		padding: "20px 20px 0px 20px",
		marginLeft: 235,
	},
	layoutStyle: {
		minHeight: "100vh",
		overflow: "hidden",
		width: "100%",
		maxWidth: "100%",
		backgroundColor: theme.colors.colorMainBg,
	},
}));

export { useStyles };

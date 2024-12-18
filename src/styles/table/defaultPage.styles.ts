import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useDefaultStyles = createUseStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colors.colorMainBg,
		position: "relative",
		paddingBottom: 0,
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
			color: theme.colors.colorFontTitle,
		},
	},
}));

export { useDefaultStyles };

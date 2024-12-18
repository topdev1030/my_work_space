import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	footerStyle: {
		textAlign: "center",
		background: theme.colors.colorMainBg,
		position: "relative",
		bottom: 0,
		width: "100%",
		"&.ant-layout-footer": {
			fontSize: 12,
			color: theme.colors.colorTextGray,
		},
		alignSelf: "center",
		marginLeft: 235,
	},
}));

export { useStyles };

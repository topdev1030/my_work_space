import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	headerStyle: {
		alignItems: "center",
		display: "flex",
		justifyContent: "space-between",
		height: 48,
		paddingInline: 10,
		lineHeight: "70px",
		background: "inherit",
	},
	title: {
		"&.ant-typography": {
			marginBottom: "0 !important",
			fontFamily: "Poppins-Medium",
			fontSize: 30,
			background: "inherit",
		},
	},
	searchBar: {
		width: 300,
		borderRadius: "10px",
		border: 0,
		height: 48,
		color: theme.colors.colorTextGray,
	},
}));

export { useStyles };

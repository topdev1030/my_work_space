import { theme } from "@/theme";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	root: {
		margin: 0,
		padding: "4px 11px",
		fontSize: 14,
		background: theme.colors.colorFormBG,
	},
});

export { useStyles };

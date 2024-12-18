import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	chart: {
		"& canvas": {
			height: 320,
			width: "100% !important",
		},
	},
	headerValue: {
		color: theme.colors.colorText,
	},
	gradient: {
		background: theme.colors.colorCardGradient,
	},
}));

export { useStyles };

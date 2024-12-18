import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useNoDataStyles = createUseStyles((theme: Theme) => ({
	emptyImage: {
		height: "40px !important",
		opacity: 1,
	},
	emptyDescription: {
		color: theme.colors.colorTextTertiary,
		textAlign: "center",
	},
}));

export { useNoDataStyles };

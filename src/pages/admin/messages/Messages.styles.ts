import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	invisible: {
		visibility: "hidden",
	},
}));

export { useStyles };

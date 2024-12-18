import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	reportPdfCol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
}));

export { useStyles };

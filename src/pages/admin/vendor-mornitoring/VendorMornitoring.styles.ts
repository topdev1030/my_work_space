import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	vendorTable: {
		"& .ant-table": {
			"& table": {
				tableLayout: "fixed !important",
			},
		},
	},
	formLabel: {
		fontWeight: 400,
	},
	reportFileDragger: {
		"& .ant-upload-drag-container": {
			display: "flex",
			flexDirection: "column",
		},
	},
	uploadFileCol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	circleOR: {
		width: 50,
		height: 50,
		backgroundColor: theme.colors.colorCircleBg,
		borderRadius: 25,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "#141414",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
}));

export { useStyles };

import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const tableStyles = createUseStyles((theme: Theme) => ({
	drawerRoot: {
		zIndex: 99,
		"& .ant-drawer-content": {
			borderRadius: "0 20px 20px 20px",
		},
		"& .ant-drawer-body": {
			backgroundColor: theme.colors.colorModalBg,
			overflow: "hidden",
			padding: 0,
			"&::-webkit-scrollbar": {
				width: "16px",
			},
			"&::-webkit-scrollbar-thumb": {
				borderRadius: "10px",
				backgroundColor: "#498DCE",
				border: "4px solid transparent",
				backgroundClip: "padding-box",
			},
		},
		"& .ant-drawer-header": {
			backgroundColor: theme.colors.colorModalBg,
		},
	},
	entryContainer: {
		color: "#6B6B6B",
		margin: 20,
	},
	highColor: {
		borderColor: "#FF7B23",
		color: "#FF7B23",
	},
	mediumColor: {
		borderColor: "#F7FF5F",
		color: "#F7FF5F",
	},
	noColor: {
		borderColor: "#6B6B6B",
		color: "#6B6B6B",
	},
	tagStyle: {
		height: "fit-content",
		border: "1px solid",
		borderRadius: "16px",
		padding: "2px 0px",
		backgroundColor: "inherit",
		width: "100%",
		textAlign: "center",
		marginInlineEnd: 0,
	},
	innerTagStyle: {
		width: 18,
		height: 20,
		borderRadius: 4,
		borderColor: "8E8E8E",
		padding: "0 2px",
	},
	tableContainer: {
		"& .ant-pagination": {
			display: "none",
		},
	},
	button: {
		width: "max-content",
		padding: "10px 20px",
		height: 44,
		backgroundColor: "transparent",
	},
	tdSize: {
		minHeight: "110px !important",
		alignItems: "start",
	},
}));

export { tableStyles };

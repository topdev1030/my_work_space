import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	root: {
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
}));

export { useStyles };

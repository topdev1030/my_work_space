import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	root: {
		display: "inline-block",
		width: "100%",
		height: 48,
		"& .ant-select-selector": {
			border: `1px solid ${theme.colors.colorFormBorder}`,
			borderRadius: 8,
			fontSize: 12,
			color: theme.colors.colorFormSelectColor,
			backgroundColor: `${theme.colors.colorFormBG} !important`,
		},
		"& .ant-select-arrow": {
			color: theme.colors.colorBgLightBlue,
			fontSize: 14,
		},
	},
	selectReadOnly: {
		pointerEvents: "none",
	},
	popup: {
		borderRadius: 14,
		background: theme.colors.colorSiderBG,
		"& .ant-select-item-option": {
			background: theme.colors.colorFormBG,
			alignItems: "center",
			height: 46,
			borderRadius: 10,
			margin: "1.5px 3px",
		},
		"& .ant-select-item-option-selected": {
			background: `${theme.colors.colorBgSpotlight} !important`,
		},
		"& .ant-select-item-option:hover": {
			background: theme.colors.colorBgSpotlight,
		},
	},
}));

export { useStyles };

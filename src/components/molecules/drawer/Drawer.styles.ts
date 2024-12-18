import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	root: {
		"& .ant-drawer-content-wrapper": {
			boxShadow: "none",
		},
		"& .ant-drawer-right > .ant-drawer-content-wrapper": {
			boxShadow: "none",
		},
		"& .ant-drawer-header": {
			minHeight: 3,
			border: 0,
			padding: 0,
		},
		"& .ant-drawer-close": {
			position: "absolute",
			margin: 0,
			padding: 0,
			zIndex: -1,
			background: theme.colors.colorDrawerBG,
			borderTopLeftRadius: 14,
			borderBottomLeftRadius: 14,
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			height: 57,
			width: 73,

			"&:hover": {
				background: theme.colors.colorDrawerBG,
			},
		},
		"& .ant-drawer-content": {
			backgroundColor: theme.colors.colorDrawerBG,
		},
	},
	rootBottom: {
		"& .ant-drawer-close": {
			top: 0,
			right: 0,
			transform: "rotate(90deg)",
			transformOrigin: "top right",
		},
	},
	rootTop: {
		"& .ant-drawer-close": {
			bottom: 0,
			right: 0,
			transform: "rotate(-90deg)",
			transformOrigin: "bottom right",
		},
	},
	rootLeft: {
		"& .ant-drawer-close": {
			top: 0,
			right: 0,
			transform: "translateX(100%) rotate(180deg)",
		},
	},
	rootRight: {
		"& .ant-drawer-close": {
			top: 0,
			left: 0,
			transform: "translateX(-100%)",
		},
	},
	tabShapeIcon: {
		width: 24,
		height: 24,
		color: "transparent",
		filter: `drop-shadow(0 1px 15px ${theme.colors.colorFillSecondary})`,
	},
	closeIcon: {
		color: "#FB4242",
		position: "absolute",
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
	},
	sbText: {
		color: theme.colors.colorTextSecondary,
	},
}));

export { useStyles };

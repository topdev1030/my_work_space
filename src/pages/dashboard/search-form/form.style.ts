import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useStyles = createUseStyles((theme: Theme) => ({
	title: {
		color: theme.colors.colorText,
	},
	fieldTitle: {
		fontSize: 12,
		fontWeight: 500,
		color: theme.colors.colorFormSelectColor,
	},
	chart: {
		"& canvas": {
			height: 285,
			width: 300,
		},
	},
	popupcontainer: {
		padding: 0,
		"& .ant-popover-inner": {
			backgroundColor: theme.colors.colorSiderBG,
			borderRadius: "14px",
		},
	},
	searchInput: {
		border: "none",
		outline: "none",
		backgroundColor: theme.colors.colorFormBG,
		height: "48px",
	},

	list_container: {
		scrollbarWidth: "thin", // Firefox
		scrollbarColor: "#498DCE transparent", // Firefox
		"&::-webkit-scrollbar": {
			width: "6px",
			height: "26px",
		},
		"&::-webkit-scrollbar-track": {
			background: "transparent",
			borderRadius: "10px",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "#498DCE",
			borderRadius: "10px",
			border: "2px solid transparent",
		},
		"& .ant-list-items": {
			paddingRight: "23px",
		},
	},
	list_item: {
		backgroundColor: theme.colors.colorFormBG,
		borderRadius: "10px",
		border: "none",
		borderBlockEnd: "none !important",
		paddingLeft: "14px !important",
		color: theme.colors.colorFormSelectColor,
		"& + &": {
			marginTop: "8px",
		},
	},
	search_form_item_row: {
		"& .ant-form-item-row .ant-form-item-label label::first-letter": {
			textTransform: "uppercase !important",
		},
	},
	selectBar: {
		"& .ant-select-selector": {
			border: "transparent !important",
		},
	},
}));

export { useStyles };

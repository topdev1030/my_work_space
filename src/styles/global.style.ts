import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

export const useStyles = createUseStyles((theme: Theme) => ({
	input_field_primary: {
		width: "100%",
		height: 48,
		backgroundColor: theme.colors.colorFormBG,
		borderRadius: 10,
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: theme.colors.colorTextGray,
		},
	},
	selectbox_field_primary: {
		width: "100%",
		height: 48,
		"& .ant-select-selector": {
			border: "1px solid ",
			borderColor: theme.colors.colorBorder,
			borderRadius: 8,
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: theme.colors.colorFormSelectColor,
			backgroundColor: `${theme.colors.colorFormBG} !important`,
		},
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
	},
	select_option_field_primary: {
		display: "flex",
		alignItems: "center",
		padding: 10,
		scrollbarColor: "#498DCE",
		scrollbarWidth: "thin",
	},
	searchBtn: {
		width: "100%",
		height: 48,
		border: 0,
		borderRadius: 10,
		backgroundColor: theme.colors.colorBgLightBlue,
		"& .ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: theme.colors.colorFontTitle,
		},
	},
	clearBtn: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderColor: theme.colors.colorBgLightBlue,
		height: 48,
		borderRadius: 10,
		backgroundColor: "transparent",
		"& .ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: "#498DCE",
		},
	},

	input_field_secondary: {
		width: "100%",
		height: 48,
		backgroundColor: theme.colors.colorFormBG,
		borderRadius: 10,
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: theme.colors.colorFormSearchColor,
		},
	},
	selectbox_field_secondary: {
		width: "100%",
		height: 48,
		"& .ant-select-selector": {
			border: "1px solid ",
			borderColor: theme.colors.colorBorder,
			borderRadius: 8,
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: theme.colors.colorFormSelectColor,
			backgroundColor: `${theme.colors.colorFormBG} !important`,
		},
	},
	btn_text: {
		"&.ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: theme.colors.colorFontTitle,
		},
	},
}));

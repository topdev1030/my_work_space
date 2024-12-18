import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useFormStyles = createUseStyles((theme: Theme) => ({
	content: {
		marginTop: 30,
	},
	cardContent: {
		marginTop: 15,

		"& .ant-pagination": {
			". ant-pagination-options": {
				display: "none",
			},
		},
	},
	formContainer: {
		display: "flex",
		flexDirection: "column",
		marginTop: "35px",
	},
	panelTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-ExtraLight",
			fontSize: 20,
			color: theme.colors.colorFontTitle,
			marginBottom: 20,
		},
	},
	fieldContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "end",
	},
	formItem: {
		"& .ant-form-item-label > label": {
			fontSize: 12,
			fontWeight: 500,
			color: theme.colors.colorFormSelectColor,
		},
	},
	fieldTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			fontWeight: 500,
			color: theme.colors.colorFormSelectColor,
		},
	},
	inputField: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	formTextarea: {
		background: theme.colors.colorFormBG,
	},
	searchText: {
		marginBottom: 5,
	},
	inputBar: {
		height: 48,
		backgroundColor: theme.colors.colorFormBG,
		borderRadius: 10,
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: "#6B6B6B",
		},
	},
	selectOptionOverflow: {
		"& .rc-virtual-list-holder": {
			marginRight: 15,
		},
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	filledBtn: {
		height: 48,
		border: 0,
		borderRadius: 10,
		background: "#498DCE",
		"& .ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: "#FFFFFF",
		},
		"&:hover": {
			background: `${theme.colors.colorButtonHover} !important`,
		},
	},
	filledBtnText: {
		color: "#FFFFFF",
	},
	outlinedBtn: {
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#498DCE",
		height: 48,
		borderRadius: 10,
		backgroundColor: "transparent",
		"& .ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: "#498DCE",
		},
	},
}));

export { useFormStyles };

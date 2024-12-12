import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useSearchFormStyles = createUseStyles((theme: Theme) => ({
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
	searchContainer: {
		display: "flex",
		flexDirection: "column",
		marginTop: "35px",
	},
	panelTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-ExtraLight",
			fontSize: 20,
			color: "#FFF",
			marginBottom: 20,
		},
	},
	searchOptionContainer: {
		marginTop: 10,
		marginBottom: 30,
	},
	fieldContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "end",
	},
	fieldTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: "#8E8E8E",
		},
	},
	searchField: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
	},
	searchText: {
		marginBottom: 5,
	},
	searchBar: {
		width: "100%",
		height: 48,
		backgroundColor: "#282937",
		borderRadius: 10,
		"&.ant-typography": {
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: "#6B6B6B",
		},
	},
	selectBar: {
		width: "100%",
		height: 48,
		"& .ant-select-selector": {
			border: "1px solid #424242 !important",
			borderRadius: 8,
			fontFamily: "Poppins-Regular",
			fontSize: 12,
			color: "#8E8E8E",
			backgroundColor: "#282937 !important",
		},
	},
	searchBtn: {
		width: "100%",
		height: 48,
		border: 0,
		borderRadius: 10,
		backgroundColor: "#498DCE",
		"& .ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 16,
			color: "#FFF",
		},
	},
	clearBtn: {
		width: "100%",
		border: "1px solid",
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

export { useSearchFormStyles };

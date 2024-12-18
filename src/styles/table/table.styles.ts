import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useTableStyles = createUseStyles((theme: Theme) => ({
	content: {
		marginTop: 30,
	},
	dataTable: {
		flex: 1,
		"& .ant-table": {
			background: theme.colors.colorBgContainer,
			paddingBottom: 20,
			"& .ant-table-measure-row": {
				display: "none",
			},
			"& th, & td": {
				fontFamily: "poppins-medium",
				fontSize: 13,
				color: theme.colors.colorText,
				fontWeight: 400,
			},
			"& th": {
				color: "#8E8E8E !important",
			},
			"& tr > td": {
				padding: 0,
				background: "none",
				justifyContent: "center",
				alignItems: "center",
				borderBottom: 0,
				"&:hover": {
					background: "none",
				},
				// borderTop: "16px solid #1C1C1C",
			},
			"& th .ant-dropdown-open": {
				visibility: "hidden",
			},
			"& tr > th": {
				borderBottom: "1px solid #6B6B6B",
				fontSize: 13,
				fontFamily: "poppins-medium",
				color: theme.colors.colorFormSelectColor,
				fontWeight: 400,
				backgroundColor: theme.colors.colorMainBg,
			},
			"& .ant-table-cell-row-hover": {
				background: "none !important",
			},
		},
		"& .ant-pagination": {
			"& .ant-pagination-options": {
				display: "none !important",
			},
			"& .ant-pagination-item": {
				border: `1px solid ${theme.colors.colorBgLightBlue}`,
				borderRight: 0,
				borderRadius: 0,
				marginInlineEnd: 0,
				padding: "20px 0",
				alignItems: "center",
				display: "flex",
				backgroundColor: theme.colors.colorMainBg,
			},
			"& .ant-pagination-item-active > a": {
				color: theme.colors.colorText,
				backgroundColor: "#498dce",
			},
			"& .ant-pagination-item > a": {
				padding: "5px 14px",
			},
			"& .ant-pagination-prev": {
				fontFamily: "poppins-medium",
				display: "flex",
				border: "1px solid #498dce",
				borderTopRightRadius: 0,
				borderBottomRightRadius: 0,
				borderRight: 0,
				padding: "20px 10px",
				alignItems: "center",
				marginInlineEnd: 0,
				color: "#498dce",
			},
			"& .ant-pagination-prev.ant-pagination-disabled a[disabled]": {
				color: "#6B6B6B !important",
			},
			"& .ant-pagination-next.ant-pagination-disabled a[disabled]": {
				color: "#6B6B6B !important",
			},
			"& .ant-pagination-jump-next": {
				border: "1px solid #498dce",
				borderRight: 0,
				borderRadius: 0,
				marginInlineEnd: 0,
				padding: "20px 0",
				alignItems: "center",
				display: "flex",
				backgroundColor: theme.colors.colorMainBg,
			},
			"& .ant-pagination-next": {
				border: "1px solid #498dce",
				borderTopLeftRadius: 0,
				borderBottomLeftRadius: 0,
				padding: "20px 20px",
				alignItems: "center",
				justifyContent: "end",
				display: "flex",
				color: "#498dce",
				fontFamily: "poppins-medium",
			},
			"& .ant-pagination-item-link-icon": {
				padding: "0 9px",
			},
			"& .ant-pagination-item-ellipsis": {
				padding: "0 5px",
			},
			"& .ant-pagination-jump-prev": {
				border: "1px solid #498dce",
				borderRight: 0,
				borderRadius: 0,
				marginInlineEnd: 0,
				padding: "20px 0",
				alignItems: "center",
				display: "flex",
				backgroundColor: theme.colors.colorMainBg,
			},
		},
	},
	tdFirstCell: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		marginTop: 16,
		padding: "16px 8px",
		height: "100%",
		display: "flex",
		alignItems: "center",
		background: "#282937",
		minHeight: 64,
	},
	tdLastCell: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		marginTop: 16,
		padding: "16px 8px",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		display: "flex",
		background: "#282937",
		minHeight: 64,
	},
	tdCell: {
		marginTop: 16,
		padding: "16px 8px",
		height: "100%",
		alignItems: "center",
		display: "flex",
		background: "#282937",
		minHeight: 64,
	},
	tdStyleEven: {
		backgroundColor: theme.colors.colorFieldEvenBG,
	},
	tdStyleOdd: {
		backgroundColor: theme.colors.colorFieldOddBG,
	},
	tdIconStyle: {
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	filePdfCol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	invisible: {
		visibility: "hidden",
	},
	OptionContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	optionTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-ExtraLight",
			fontSize: 20,
			color: theme.colors.colorFontTitle,
		},
	},
	sortContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	sortTitle: {
		marginBottom: "0 !important",
		"&.ant-typography": {
			fontSize: 14,
			color: theme.colors.colorTextGray,
		},
	},
	sortBar: {
		width: "70%",
		height: 22,

		"& > .ant-select-selector": {
			border: "0 !important",
			backgroundColor: "transparent !important",
			fontFamily: "Poppins-Medium",
			fontSize: 14,
			color: theme.colors.colorBgLightBlue,
		},

		"& .anticon-down": {
			color: theme.colors.colorBgLightBlue,
		},

		"& > div > div >.ant-select-selection-placeholder": {
			insetInlineEnd: "0 !important",
		},
	},
	viewIconContainer: {
		"& .ant-image": { display: "flex", float: "inline-end", marginRight: 10 },
	},
}));

export { useTableStyles };

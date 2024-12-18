import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useCardStyles = createUseStyles((theme: Theme) => ({
	cardPagination: {
		display: "flex",
		justifyContent: "center",
		marginTop: "30px",
		marginBottom: 10,

		"& .ant-pagination": {
			"& .ant-pagination-item": {
				border: "1px solid #498dce",
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
			"& .ant-pagination-next.ant-pagination-disabled a[disabled]": {
				color: "#6B6B6B !important",
			},
			"& .ant-pagination-prev.ant-pagination-disabled a[disabled]": {
				color: "#6B6B6B !important",
			},
		},
	},
	cardContainer: {
		color: theme.colors.colorFontTitle,
		borderRadius: 10,
		border: 0,

		"& .ant-card-body": {
			padding: "16px 8px",

			"& .ant-divider-horizontal": {
				margin: "10px 0",
			},

			"& .ant-space-gap-row-small": {
				rowGap: 0,
			},
		},
	},
	cardBackgroundOdd: {
		background: theme.colors.colorFieldOddBG,
	},
	cardBackgroundEven: {
		background: theme.colors.colorFieldEvenBG,
	},
	filePdfCol: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	fileDragger: {
		"& .ant-upload-drag-container": {
			display: "flex",
			flexDirection: "column",
		},
	},
	subtitle: {
		color: theme.colors.colorTextTertiary,
		fontWeight: 400,
		fontSize: 10,
		fontFamily: "'Poppins-Regular'",
	},
	card_text_space: {
		width: "100%",
		overflow: "hidden",
	},
	value: {
		color: theme.colors.colorFontTitle,
		fontWeight: 500,
		fontSize: 12,
		fontFamily: "'Poppins-Regular'",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		marginBottom: 0,
	},
}));

export { useCardStyles };

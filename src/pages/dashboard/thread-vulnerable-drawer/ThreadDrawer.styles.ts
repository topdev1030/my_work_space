import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";
import alpha from "color-alpha";

const useStyles = createUseStyles((theme: Theme) => ({
	root: {
		zIndex: 99,
		"& .ant-drawer-body": {
			padding: 0,
			overflow: "hidden",
		},
	},
	entryContainer: {
		// width: 1200,
		color: "#6B6B6B",
		margin: 48,
	},
	entryHeader: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundColor: "transparent",
		borderRadius: 4,
	},
	betaTag: {
		padding: "0 8px",
		borderColor: theme.colors.colorSuccess,
		borderRadius: 44,
		fontSize: 14,
		fontWeight: 500,
		color: "#FFFFFF",
	},
	category: {
		"&.ant-typography": {
			marginTop: 24,
			fontSize: 12,
			fontWeight: 500,
			letterSpacing: 0,
			lineHeight: "1em",
			color: "#FFFFFF",
			textTransform: "uppercase",
		},
	},
	title: {
		"&.ant-typography": {
			marginTop: "8px !important",
			marginBottom: 8,
			maxWidth: 480,
			color: "#FFFFFF",
			fontSize: 34,
			fontWeight: 700,
			lineHeight: 1.25,
			letterSpacing: "-0.04em",
		},
	},
	mentionsTag: {
		padding: "0 8px",
		fontSize: 12,
		borderColor: theme.colors.colorError,
		borderRadius: 44,
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: 1.5,
		color: "#FFFFFF",
		background: alpha(theme.colors.colorError, 0.2),
	},
	trendingGraphImage: {
		display: "block",
		marginTop: 24,
		height: 62,
		width: "auto",
	},
	nArticlesPastYear: {
		marginTop: 8,
		color: theme.colors.colorTextTertiaryImmutate,
		fontSize: 12,
		fontWeight: 400,
	},
	entryContent: {
		marginTop: 40,
	},
	section: {
		display: "flex",
		flexDirection: "column",
		gap: 8,
		paddingTop: 32,
		"&:first-of-type": {
			paddingTop: 0,
		},
	},
	sectionTitle: {
		display: "flex",
		alignItems: "center",
		"&.ant-typography": {
			color: theme.colors.colorText,
			fontSize: 16,
			fontWeight: 700,
			lineHeight: "1.25em",
		},
	},
	sectionContent: {
		display: "flex",
		flexDirection: "column",
		"& *": {
			fontSize: 15,
			fontWeight: 400,
			color: theme.colors.colorTextSecondary,
		},
	},
	overview: {
		"&.ant-typography": {
			marginBottom: 0,
		},
	},
	bullPointList: {
		margin: 0,
		paddingLeft: 20,
		"& > li:not(:last-of-type)": {
			marginBottom: 10,
		},
	},
	loadMoreListBtn: {
		padding: 0,
		width: "fit-content",
		"& > span": {
			fontSize: 15,
			color: theme.colors.colorSuccess,
		},
	},
	articleCountTooltipTrigger: {
		marginLeft: 10,
		color: theme.colors.colorTextTertiary,
		"& svg": {
			width: 18,
			height: 18,
		},
	},
	articleCountLineChart: {
		"& .recharts-cartesian-grid-horizontal": {
			opacity: 0.1,
		},
		"& .recharts-cartesian-axis": {
			"&.recharts-yAxis": {
				"& .recharts-cartesian-axis-tick:first-of-type": {
					display: "none",
				},
			},
			"&-tick": {
				"& > text tspan": {
					fontSize: 12,
					fontWeight: 400,
					color: theme.colors.colorText,
				},
			},
		},
	},
	tableView: {
		"&.ant-table": {
			background: "transparent",
		},
		"& th": {
			paddingLeft: 10,
			fontSize: 10,
			fontFamily: "poppins-medium",
		},
		"& td": {
			paddingLeft: 10,
			verticalAlign: "middle",
			fontFamily: "poppins-medium",
			fontSize: 14,
			color: theme.colors.colorTextSecondary,
			"& ul": {
				paddingLeft: 20,
			},
		},
	},
	ttpsTableTechniqueColumn: {
		"&.ant-table-cell": {
			fontFamily: "poppins-medium",
			color: theme.colors.colorBrandWhite,
			fontWeight: 600,
		},
	},
	vulnsTableCVEIDColumn: {
		"&.ant-table-cell": {
			"& *": {
				fontSize: 12,
				color: theme.colors.colorTextTertiary,
			},
			"& > h1": {
				fontSize: 14,
				marginBottom: 4,
				color: theme.colors.colorText,
			},
		},
	},
	vulnsTableVendorColumn: {
		"&.ant-table-cell": {
			textTransform: "capitalize",
		},
	},
	cvssScoreTag: {
		padding: "0 8px",
		fontSize: 14,
		borderColor: theme.colors.colorError,
		borderRadius: 44,
		fontWeight: 500,
		letterSpacing: 0,
		lineHeight: 1.5,
		color: theme.colors.colorText,
		background: alpha(theme.colors.colorError, 0.2),
	},
	volnTrendingGraph: {
		width: 90,
		height: "auto",
	},
	button: {
		width: "max-content",
		padding: "10px 20px",
		height: 44,
		backgroundColor: "transparent",
	},
	graphContainer: {
		"& .ant-image": {
			border: "1px solid",
			borderRadius: 5,
			padding: "0px 10px",
			width: "100%",
		},
	},
	referenceContainer: {
		"& .ant-image-img": {
			width: 120,
			height: 80,
		},
	},
	scrollableContent: {
		maxHeight: 400, // Limit height and enable scroll
		overflowY: "auto",
		padding: 10,
		backgroundColor: "#f9f9f9",
		border: "1px solid #ddd",
	},
	// "@media print": {
	// 	"@global": {
	// 		"body *": {
	// 			visibility: "hidden", // Hide all elements initially
	// 		},
	// 		"#printable-content": {
	// 			position: "absolute",
	// 			left: 0,
	// 			top: 0,
	// 			width: "100%",
	// 			height: "auto",
	// 			overflow: "visible", // Remove scrolling
	// 			backgroundColor: "white",
	// 			color: "black",
	// 			"& *": {
	// 				visibility: "visible", // Show only the printable content
	// 			},
	// 		},
	// 		".expand-for-print": {
	// 			maxHeight: "none !important",
	// 			overflow: "visible !important",
	// 		},
	// 	},
	// },
}));

export { useStyles as usethreadDrawerStyles };

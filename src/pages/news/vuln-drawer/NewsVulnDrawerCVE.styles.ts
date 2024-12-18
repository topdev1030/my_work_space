import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";
import getFontSizes from "antd/es/theme/themes/shared/genFontSizes";

const useStyles = createUseStyles((theme: Theme) => ({
	header: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "start",
	},
	heading: {
		flex: 1,
	},
	features: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		marginBottom: 5,
	},
	trendsFeature: {
		"&.ant-typography": {
			fontSize: 12,
			fontWeight: 700,
			color: theme.colors.colorBrandOrange100,
		},
	},
	feature: {
		"&.ant-typography": {
			fontSize: 12,
			fontWeight: 700,
			color: theme.colors.colorBrandRed300,
		},
	},
	featureSeparator: {
		fontSize: 25,
		color: theme.colors.colorTextTertiary,
	},
	label: {
		"&.ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 20,
			fontWeight: 500,
			letterSpacing: "normal",
			lineHeight: 1.25,
			color: theme.colors.colorText,
			marginBottom: 10,
		},
	},
	cweInfo: {
		"&.ant-typography": {
			fontWeight: 500,
			fontSize: 13,
			color: theme.colors.colorTextGray200,
			letterSpacing: "normal",
			marginBottom: 10,
		},
	},
	metadata: {
		"&.ant-typography": {
			fontSize: 13,
			fontWeight: 500,
			letterSpacing: "normal",
			color: theme.colors.colorTextGray,
			marginBottom: 15,
		},
	},
	actions: {
		display: "flex",
		alignItems: "center",
		gap: 8,
		"& > button": {
			width: "20px !important",
			height: 20,
			border: 0,
			borderRadius: 3,
			background: theme.colors.colorBgLightBlue,
			"& svg": {
				color: "#FFFFFF",
				width: 15,
				height: 15,
			},
		},
	},
	pdfIcon: {
		color: theme.colors.colorBgLightBlue,
		marginRight: 5,
		"& svg": {
			width: 16,
			height: 20,
		},
	},
	pdfLabel: {
		color: theme.colors.colorBgLightBlue,
		textDecoration: "none",
		fontSize: 12,
		fontWeight: 500,
	},
	divider: {
		borderWidth: 2,
		borderColor: "#6B6B6B",
		margin: "0 3px",
	},
	dial: {
		marginRight: 15,
	},
	content: {
		display: "flex",
		flexDirection: "column",
		gap: 29,
		maxHeight: 480,
		overflow: "auto",
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
	description: {
		"&.ant-typography": {
			margin: 0,
			color: theme.colors.colorText,
			fontSize: 16,
		},
	},
	vector: {
		"&.ant-typography": {
			color: theme.colors.colorTextTertiary,
			fontSize: 13,
		},
	},
	section: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
		"&:first-of-type": {
			paddingTop: 0,
		},
	},
	sectionTitle: {
		fontFamily: "Poppins-Medium",
		"& > h2.ant-typography": {
			margin: 0,
			color: theme.colors.colorText,
			fontSize: 15,
			fontWeight: 600,
		},
		"& > h3.ant-typography": {
			marginBottom: 0,
			color: theme.colors.colorBrandOrange100,
			fontSize: 13,
			fontWeight: 500,
			letterSpacing: 0,
			lineHeight: 1,
			textTransform: "uppercase",
			display: "flex",
			alignItems: "center",
			gap: 16,
		},
	},
	sectionContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		"& .ant-typography": {
			fontSize: 11,
		},
	},
	timeline: {
		marginTop: 12,
		"& .ant-timeline-item": {
			"& .ant-timeline-item-head": {
				top: -5,
				width: 14,
				height: 14,
			},
			"& .ant-timeline-item-tail": {
				insetInlineStart: 6,
				height: "calc(100% - 25px)",
				top: 15,
			},
		},
	},
	timelineItem: {
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
	timelineTitle: {
		"&.ant-typography": {
			fontFamily: "Poppins-Medium",
			fontSize: 13,
			fontWeight: 500,
			color: theme.colors.colorText,
			margin: 0,
		},
	},
	timelineDescription: {
		"&.ant-typography": {
			fontSize: 11,
			color: theme.colors.colorText,
			margin: 0,
		},
	},
	timelineMetadata: {
		fontFamily: "Poppins-Family",
		display: "flex",
		alignItems: "center",
		gap: 4,
		"& > span.ant-typography": {
			fontSize: 13,
			color: theme.colors.colorTextTertiary,
		},
		"& > a": {
			padding: 0,
			height: "auto",
			"& > span": {
				fontSize: 12,
				color: theme.colors.colorTextTertiary,
				textDecoration: "underline",
			},
		},
	},
	eventsGraph: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
		border: `2px solid ${theme.colors.colorBorderSecondary}`,
		borderRadius: 4,
		"& svg": {
			display: "block",
			"& .graph-event": {
				"& > circle": {
					stroke: theme.colors.colorBrandWhite,
					fill: theme.colors.colorBrandBlack,
				},
			},
			"& .graph-event-icon": {
				fill: theme.colors.colorTextSecondary,
			},
			"& text": {
				opacity: 1,
				fill: theme.colors.colorTextTertiary,
				fontSize: 13,
			},
		},
	},
	tags: {
		display: "flex",
		alignItems: "center",
		flexWrap: "wrap",
		gap: 8,
		maxWidth: "100%",
		overflow: "hidden",
		"& span": {
			background: "transparent",
			border: 0,
		},
	},
	tag: {
		padding: "2px 4px",
		display: "flex",
		alignItems: "center",
		gap: 4,
		maxWidth: "100%",
		"& > svg": {
			minWidth: 20,
			minHeight: 20,
			color: theme.colors.colorBgLightBlue,
		},
	},
	tagText: {
		color: theme.colors.colorTagText,
		fontWeight: 500,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		"& > span": {
			margin: "0 3px",
		},
	},
}));

export { useStyles };

import { createUseStyles } from "react-jss";
import { Theme } from "@/theme";

const useModalStyles = createUseStyles((theme: Theme) => ({
	createModal: {
		width: "fit-content !important",
		"& .ant-modal-content": {
			width: 540,
			height: 768,
			overflow: "auto",
			padding: 20,
			backgroundColor: theme.colors.colorModalBg,
			borderRadius: 20,
		},
		"& .ant-modal-header": {
			color: theme.colors.colorFormSelectColor,
			backgroundColor: theme.colors.colorModalBg,
		},
	},
	createForm: {
		"& input, & input.form-control": {
			width: "100%",
			height: 50,
			backgroundColor: theme.colors.colorFormBG,
		},
		"& .ant-select-single": {
			height: "50px !important",
		},
		"& .ant-select-selector": {
			border: "1px solid ",
			borderColor: theme.colors.colorBorder,
			borderRadius: 8,
			backgroundColor: `${theme.colors.colorFormBG} !important`,
		},
	},
	formTitle: {
		"&.ant-typography": {
			textAlign: "start",
			fontWeight: 600,
			fontSize: 24,
			textTransform: "none",
			marginBottom: 20,
		},
	},
	formActions: {
		marginTop: 10,
		display: "flex",
		alignItems: "center",
		gap: 20,
	},
	pdfPreviewModal: {
		width: "fit-content",
		"& > .ant-modal-content": {
			width: 612,
			padding: 0,
			background: "none",
			border: "none",
			borderRadius: 20,
			"& > .ant-modal-close": {
				right: -28,
				top: 0,
			},
		},
	},
	fileDragger: {
		"& .ant-upload-drag-container": {
			display: "flex",
			flexDirection: "column",
		},
	},
	fileDraggerTitle: {
		color: theme.colors.colorFormSelectColor,
		marginBottom: 15,
		fontSize: "10px !important",
	},
}));

export { useModalStyles };

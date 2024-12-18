import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	root: {
		height: 32,
		padding: "4px 15px",
		borderRadius: 6,
		fontSize: 14,
		"& .ant-btn-color-default": {
			boxShadow: "none",
		},
	},
});

export { useStyles };

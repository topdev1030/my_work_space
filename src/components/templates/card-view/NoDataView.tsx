import { Image } from "antd";
import clsx from "clsx";
// styles
import { useNoDataStyles } from "./NoDataView.styles";
// icons
import noDataIcon from "../../../static/images/no_data.svg";

const NodataView = () => {
	const styles = useNoDataStyles();

	return (
		<div className="flex flex-column justify-center">
			<Image src={noDataIcon} className={clsx([styles.emptyImage], "mb-2")} />
			<div className={styles.emptyDescription}>No data</div>
		</div>
	);
};

export { NodataView };

import { useState, useEffect, MouseEvent, KeyboardEvent } from "react";

// components
import { Drawer } from "@/components";
import { ThreadDrawer } from "../../dashboard/thread-vulnerable-drawer/ThreadDrawer";
import { NewsVulnDrawerTrendingAnalysis } from "./NewsVulnDrawerTrendingAnalysis";

// types
import { NewsVulnDrawerProps, VULN_DRAWER_TYPE } from "./NewsVulnDrawer.types";

// styles
import { useStyles } from "./NewsVulnDrawer.styles";

const NewsVulnDrawer = ({
	vulnerability,
	open,
	onClose,
}: NewsVulnDrawerProps) => {
	const [drawerType, setDrawerType] = useState<VULN_DRAWER_TYPE>(
		VULN_DRAWER_TYPE.UNKNOWN
	);

	const styles = useStyles();

	const onCloseDrawer = (e: MouseEvent | KeyboardEvent) => {
		// close drawer
		onClose?.(e);

		// reset drawer
		setDrawerType(VULN_DRAWER_TYPE.UNKNOWN);
	};

	useEffect(() => {
		const { cvss, cvssCategoryEstimate } =
			vulnerability.vulnerabilitiesMetadata;
		if (cvss || cvssCategoryEstimate) {
			setDrawerType(VULN_DRAWER_TYPE.CVE);
		} else {
			setDrawerType(VULN_DRAWER_TYPE.TREND_ANALYSIS);
		}
	}, [vulnerability]);

	return (
		<Drawer
			className={styles.root}
			width="60%"
			style={{ height: 740 }}
			placement="right"
			open={open}
			onClose={onCloseDrawer}
		>
			<div className={styles.entryContainer}>
				{drawerType === VULN_DRAWER_TYPE.CVE && (
					<ThreadDrawer cve_id={vulnerability.label} />
				)}
				{drawerType === VULN_DRAWER_TYPE.TREND_ANALYSIS && (
					<NewsVulnDrawerTrendingAnalysis vulnerability={vulnerability} />
				)}
			</div>
		</Drawer>
	);
};

export { NewsVulnDrawer };

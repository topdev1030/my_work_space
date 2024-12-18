import { useTheme } from "react-jss";
import cx, { clsx } from "clsx";

// components
import { Typography } from "@/components/atoms";

// theme
import { Theme } from "@/theme";

// constants
import { METER_MIN, METER_MAX, needleDegrees } from "./SeverityDial.constants";

// types
import type { SeverityDialProps } from "./SeverityDial.types";

// styles
import { useStyles } from "./SeverityDial.styles";

const { Text } = Typography;

const SeverityDial = ({ className, ...props }: SeverityDialProps) => {
	const { severity } = props;

	const theme: Theme = useTheme();

	const styles = useStyles({ ...props, theme });

	const classes = cx({
		[styles.root]: true,
		[className || ""]: className,
	});

	return (
		<div className={classes}>
			<div className={styles.meter}>
				<div className={clsx([styles.graduation], "cvss-img-bg")} />
				<div className={styles.indicator}>
					<div
						className={styles.needle}
						style={{ transform: `rotate(${needleDegrees[severity]}deg)` }}
					/>
					<div className={styles.labels}>
						<Text>{METER_MIN}</Text>
						<Text>{METER_MAX}</Text>
					</div>
				</div>
			</div>
			<div className={styles.metrics}>
				<Text className={styles.cvss}>
					{severity.toLowerCase()} Severity
					<br />
					<div>(Estimated)</div>
				</Text>
				<Text className={styles.epss}>No EPSS yet</Text>
			</div>
		</div>
	);
};

export { SeverityDial };

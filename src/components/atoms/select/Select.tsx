import { Select as AntSelect } from "antd";
import cx from "clsx";

// types
import { SelectProps } from "./Select.types";

// styles
import { useStyles } from "./Select.styles";

const Select = ({
	className,
	popupClassName,
	value,
	onChange,
	readOnly,
	...props
}: SelectProps) => {
	const styles = useStyles();

	return (
		<AntSelect
			className={cx({
				[styles.root]: true,
				[styles.selectReadOnly]: readOnly,
				[className || ""]: className,
			})}
			popupClassName={cx({
				[styles.popup]: true,
				[popupClassName || ""]: popupClassName,
			})}
			value={value}
			onChange={onChange}
			{...props}
		/>
	);
};

const CompoundElements = Object.assign(Select, {
	Option: AntSelect.Option,
});

export { CompoundElements as Select };

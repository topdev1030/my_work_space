import { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Space, Image } from "antd";

// components
import { Button, Radio } from "@/components/atoms";
import { Drawer } from "./Drawer";

// types
import { DrawerProps } from "./Drawer.types";

// styles
import { useStyles } from "./Drawer.styles";

// icons
import closeIcon from "../../../static/images/closeIcon.svg";

export default {
	component: Drawer,
	title: "molecules/Drawer",
};

export const Default = () => {
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

	const styles = useStyles();

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onChange = (e: RadioChangeEvent) => {
		setPlacement(e.target.value);
	};

	return (
		<>
			<Space>
				<Radio.Group value={placement} onChange={onChange}>
					<Radio value="top">top</Radio>
					<Radio value="right">right</Radio>
					<Radio value="bottom">bottom</Radio>
					<Radio value="left">left</Radio>
				</Radio.Group>
				<Button type="primary" onClick={showDrawer}>
					Open
				</Button>
			</Space>
			<Drawer
				title="Basic Drawer"
				placement={placement}
				open={open}
				key={placement}
				closeIcon={
					<Image src={closeIcon} preview={false} width={18} height={18} />
				}
				onClose={onClose}
			>
				<p className={styles.sbText}>Some contents...</p>
				<p className={styles.sbText}>Some contents...</p>
				<p className={styles.sbText}>Some contents...</p>
			</Drawer>
		</>
	);
};

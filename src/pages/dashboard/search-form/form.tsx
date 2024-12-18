import React from "react";
import { Image, Form } from "antd";
import { Select } from "@/components";
import clsx from "clsx";
// styles
import { useStyles } from "./form.style";
import { useFormStyles } from "@/styles/table/form.style";
// types
import { IFilterOptionItem, OptionProps, searchFormValues } from "./form.types";
// icons
import CalendarIcon from "../../../static/images/calendar.svg";
import trendingIcon from "../../../static/images/parameter.svg";
import newIcon from "../../../static/images/new.svg";
import patchedIcon from "../../../static/images/patched.svg";
import exploitedIcon from "../../../static/images/exploited.svg";
import proofOfConceptIcon from "../../../static/images/proof_of_concept.svg";
import weaponizedIcon from "../../../static/images/weaponized.svg";
import cveIdIcon from "../../../static/images/cve_id.svg";

interface searchProps {
	params: searchFormValues;
	setParams: (data: searchFormValues) => void;
}

const date_options = [
	{
		key: "1",
		value: "Last 24 Hours",
	},
	{
		key: "2",
		value: "Last 7 Days",
	},
	{
		key: "3",
		value: "Last 30 Days",
	},
];

const searchFilter: IFilterOptionItem[] = [
	{
		icon: <Image src={trendingIcon} />,
		label: "Trending",
		value: "trending",
	},
	{
		icon: <Image src={newIcon} />,
		label: "New",
		value: "created",
	},
	{
		icon: <Image src={patchedIcon} />,
		label: "Patched",
		value: "patched",
	},
	{
		icon: <Image src={exploitedIcon} />,
		label: "Exploited",
		value: "exploited",
	},
	{
		icon: <Image src={proofOfConceptIcon} />,
		label: "Proof of Concept",
		value: "poc",
	},
	{
		icon: <Image src={weaponizedIcon} />,
		label: "Weaponized",
		value: "weaponized",
	},
	{
		icon: <Image src={cveIdIcon} />,
		label: "CISA KEV",
		value: "inCisaKev",
	},
];

const SearchForm: React.FC<searchProps> = ({ setParams, params }) => {
	// Define initial values for the form fields
	const initialValues = {
		date_range: date_options[1].value,
		parameters: searchFilter.length > 0 ? searchFilter[0].label : undefined,
	};

	const [form] = Form.useForm();
	const styles = useStyles();
	const formStyles = useFormStyles();

	const Option: React.FC<OptionProps> = ({ children, ...props }) => (
		<optgroup {...props}>{children}</optgroup>
	);

	return (
		<div className="mt-6">
			<h1 className={clsx([styles.title], "mt-4 mb-6 font-medium")}>Filters</h1>
			<Form form={form} layout="inline" initialValues={initialValues}>
				<Form.Item
					layout="vertical"
					label="Date Range"
					name="date_range"
					className={formStyles.formItem}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Select
						prefix={
							<Image
								src={CalendarIcon}
								preview={false}
								style={{ marginRight: 5 }}
							/>
						}
						className={clsx([styles.selectBar], "min-w-280 flex flex-column")}
						onChange={(e) =>
							setParams({
								...params,
								dateRange: e,
							})
						}
					>
						{date_options?.map((option: any, index: number) => (
							<Option key={index} value={option.value}>
								{option.value}
							</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					layout="vertical"
					label="Parameter"
					name="parameters"
					className={formStyles.formItem}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Select
						className={clsx([styles.selectBar], "min-w-280")}
						popupClassName={formStyles.selectOptionOverflow}
						onChange={(e) =>
							setParams({
								...params,
								parameter: e,
							})
						}
					>
						{searchFilter.map((item: IFilterOptionItem, index: number) => (
							<Option key={index} value={item.label}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										padding: 10,
									}}
								>
									{item.icon}
									<span style={{ marginLeft: 8 }}>{item.label}</span>
								</div>
							</Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</div>
	);
};

export { SearchForm };

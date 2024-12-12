import React, { useState, useEffect, ReactNode, useRef } from "react";
import { Popover, Image, Spin, Drawer } from "antd";
import clsx from "clsx";
// components
import { Button, Table, Tag } from "@/components";
import { ThreadDrawer } from "../thread-vulnerable-drawer/ThreadDrawer";
import { useStyles } from "../../admin/messages/Messages.styles";
// helpers
import { convertESTDateFormat, interpolateColor } from "@/helpers";
// styles
import { tableStyles } from "./table.styles";
// types
import type { TableColumnType } from "@/components";
import { Vulnerability } from "./table.types";

interface dataProps {
	tableData: Vulnerability[];
	increaseCount: () => void;
}

const SatisficTable: React.FC<dataProps> = ({ tableData, increaseCount }) => {
	const [dataSource, setDataSource] = useState<Vulnerability[]>([]);
	const [cveID, setCveID] = useState<string>("");
	const [loadingPage, setLoadingPage] = useState<boolean>(true);
	const [loadingData, setLoadingData] = useState<boolean>(false);
	const [openThreadDrawer, setOpenThreadDrawer] = useState(false);

	const showDrawer = (value: string) => {
		setCveID(value);
		setOpenThreadDrawer(true);
	};

	const onCloseDrawer = () => {
		setOpenThreadDrawer(false);
	};
	const styles = useStyles();
	const tableStyle = tableStyles();

	const filterData = (sourceData: any) => {
		const array: Vulnerability[] = [];

		sourceData?.map((item: any) => {
			let exploit: any;
			let product: any = {};
			let vendor: any = {};
			let productArray: (object | undefined)[] = [];
			let vendorArray: (string | undefined)[] = [];

			if (item?.affectedProductsEstimate && item?.affectedProducts) {
				item.affectedProducts?.forEach((data: any, index: number) => {
					productArray.push(data?.products);
					vendorArray.push(data.vendor);
				});
				product = {
					...product,
					array: productArray,
					status: true,
				};
				vendor = {
					...vendor,
					array: vendorArray,
					status: true,
				};
			} else if (item?.affectedProductsEstimate) {
				productArray =
					item?.affectedProductsEstimate?.map((data: any) => data?.products) ||
					[];
				vendorArray =
					item?.affectedProductsEstimate?.map((data: any) => data.vendor) || [];
				product = {
					...product,
					array: productArray,
					status: false,
				};
				vendor = {
					...vendor,
					array: vendorArray,
					status: false,
				};
			} else if (item?.affectedProducts) {
				productArray =
					item?.affectedProducts?.map((data: any) => data?.products) || [];
				vendorArray =
					item?.affectedProducts?.map((data: any) => data.vendor) || [];

				product = {
					...product,
					array: productArray,
					status: true,
				};
				vendor = {
					...vendor,
					array: vendorArray,
					status: true,
				};
			}

			const patched = item.patchDetails?.map((data: any) => {
				return data?.patchAddedDate;
			});

			if (item?.exploitedAt && Array.isArray(item?.exploitedAt))
				exploit = item?.exploitedAt[0];
			else exploit = 0;

			const object = {
				cve_id: item?.cveid,
				description: item?.description,
				cvss_score: item?.cvssV3?.baseScore,
				cvss_estimate: item?.cvssCategoryEstimate,
				epss_score: item?.epssScore,
				trend: {
					articleCount: item?.urlReferenceCount,
					graphURL: item?.smallGraphUrl,
				},
				graphUrl: item?.smallGraphUrl,
				exploit,
				product,
				vendor,
				patched,
				published: item?.publishedDate,
			};

			return array.push(object);
		});

		return array;
	};

	const handleClick = () => {
		setLoadingData(true);
	};

	useEffect(() => {
		setLoadingPage(true);
		setDataSource(filterData(tableData));
		setLoadingPage(false);
		setLoadingData(false);
	}, [tableData]);

	const columns: TableColumnType[] = [
		{
			title: "Published",
			dataIndex: "published",
			width: 100,
			render: (value: string) => convertESTDateFormat(value),
		},
		{
			width: 300,
			title: "CVE ID",
			dataIndex: "cve_id",
			key: "created_at",
			render: (value: string, record, index: number) => {
				return (
					<>
						<h3 onClick={() => showDrawer(value)} className="cursor-point">
							{value}
						</h3>
						<p className="text-ellipsis max-w-250 text-gray-500 mb-0">
							{dataSource[index].description}
						</p>
					</>
				);
			},
		},
		{
			title: "Vendor",
			dataIndex: "vendor",
			width: 100,
			render: (value) => {
				const array: any[] = value?.array ? value?.array?.slice(1) : [];
				const options: ReactNode[] = array.map(
					(item: string, index: number) => <p key={index}>{item}</p>
				);
				const content = <div>{options}</div>;

				return value?.array?.length !== 0 ? (
					<div
						className={clsx(
							value?.array?.length < 2
								? "justify-center"
								: "items-center flex-column",
							"flex"
						)}
					>
						<p className="flex mb-0">
							<p
								className="text-ellipsis mb-0"
								style={{
									WebkitBoxOrient: "vertical",
									maxWidth: 85,
									WebkitLineClamp: 1,
								}}
							>
								{value?.array ? value?.array[0] : ""}
							</p>
							{!value.status ? (
								<Tag
									className={clsx([
										[tableStyle.tagStyle, tableStyle.innerTagStyle],
										"font-poppines ml-1",
									])}
								>
									AI
								</Tag>
							) : (
								""
							)}
						</p>
						{value?.array?.length > 1 ? (
							<Popover
								content={content}
								trigger="click"
								className="cursor-point"
							>
								<span>
									+
									{value?.array && value?.array?.length > 0
										? (value?.array?.length || 0) - 1
										: 0}
								</span>
								<span> more</span>
							</Popover>
						) : (
							""
						)}
					</div>
				) : (
					<div className="flex justify-center">-</div>
				);
			},
		},
		{
			title: "Product",
			dataIndex: "product",
			width: 150,
			render: (value: any) => {
				const flatArray = value?.array?.flat(Infinity);

				const newArray: any[] = flatArray?.slice(1);
				const options: ReactNode[] = newArray?.map(
					(item: any, index: number) => <p key={index}>{item.name}</p>
				);
				const content = <div>{options}</div>;

				return flatArray ? (
					<div
						className={clsx(
							flatArray?.length < 2
								? "justify-center"
								: "items-center flex-column",
							"flex"
						)}
					>
						<p className="flex mb-0">
							<p
								className="text-ellipsis mb-0"
								style={{
									WebkitBoxOrient: "vertical",
									maxWidth: 85,
									WebkitLineClamp: 1,
								}}
							>
								{flatArray && Array.isArray(flatArray) ? flatArray[0].name : ""}
							</p>
							{!value.status ? (
								<Tag
									className={clsx([
										[tableStyle.tagStyle, tableStyle.innerTagStyle],
										"font-poppines ml-1",
									])}
								>
									AI
								</Tag>
							) : (
								""
							)}
						</p>
						{flatArray.length > 1 ? (
							<Popover
								content={content}
								trigger="click"
								className="cursor-point"
							>
								<span>
									+
									{flatArray && flatArray.length > 0 ? flatArray.length - 1 : 0}
								</span>
								<span> more</span>
							</Popover>
						) : (
							""
						)}
					</div>
				) : (
					<div className="flex justify-center">-</div>
				);
			},
		},
		{
			title: "CVSS Score",
			dataIndex: "cvss_score",
			width: 170,
			render: (value: number) => {
				return value ? (
					<Tag
						className={clsx([tableStyle.tagStyle], "font-poppines")}
						style={{
							color: interpolateColor(value),
							borderColor: interpolateColor(value),
						}}
					>
						CVSS {value}
					</Tag>
				) : (
					<Tag
						className={clsx(
							[tableStyle.tagStyle, tableStyle.noColor],
							"font-poppines"
						)}
					>
						-
					</Tag>
				);
			},
		},
		{
			title: "CVSS Estimate",
			dataIndex: "cvss_estimate",
			width: 200,
			render: (value: string) => {
				let colorValue = "";
				switch (value) {
					case "HIGH":
						colorValue = tableStyle.highColor;
						break;
					case "MEDIUM":
						colorValue = tableStyle.mediumColor;
						break;
					default:
						colorValue = tableStyle.noColor;
						break;
				}
				return (
					<Tag
						className={clsx([tableStyle.tagStyle, colorValue], "font-poppines")}
					>
						{value ? value : <div>-</div>}
					</Tag>
				);
			},
		},
		{
			title: "EPSS Score",
			dataIndex: "epss_score",
			width: 90,

			render: (value: string) => (
				<div className="flex justify-center">
					{value ? `${(Number(value) * 100).toFixed(2)}%` : "-"}
				</div>
			),
		},
		{
			title: "Trend",
			dataIndex: "trend",
			width: 200,

			render: (value) => {
				return value ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Image src={value.graphURL} preview={false} height={42} />
						<span
							className="flex justify-center text-xs mt-2"
							style={{ color: "#498DCE" }}
						>
							{value.articleCount !== 0 ? value.articleCount : "No"} Articles
						</span>
					</div>
				) : (
					<div className="flex justify-center">-</div>
				);
			},
		},
		{
			title: "Patched",
			dataIndex: "patched",
			width: 100,
			render: (value: any) => {
				return value === undefined ? (
					<div className="flex justify-center">-</div>
				) : (
					convertESTDateFormat(value[0])
				);
			},
		},
		{
			title: "Exploit",
			dataIndex: "exploit",
			width: 100,
			render: (value: number) => convertESTDateFormat(value),
		},
	];

	return (
		<div className="mt-4">
			<Table
				className={clsx([styles.messagesTable, tableStyle.tableContainer])}
				rowClassName={(record, index) =>
					index % 2 === 0 ? styles.tdStyleOdd : styles.tdStyleEven
				}
				rowKey="upload_date_time"
				bordered={false}
				columns={columns}
				dataSource={dataSource}
				scroll={{ x: 1200 }}
				pagination={{
					total: dataSource.length,
					position: ["bottomCenter"],
					defaultPageSize: 5,
					pageSize: dataSource.length,
					itemRender: (_, type, originalElement) => {
						if (type === "prev") {
							return <a>Previous</a>;
						}
						if (type === "next") {
							return <a>Next</a>;
						}
						return originalElement;
					},
					showSizeChanger: false,
				}}
				loading={loadingPage}
			/>

			<Spin size="default" spinning={loadingData}>
				<p
					onClick={() => {
						increaseCount();
						handleClick();
					}}
					className="text-xs primary-color text-center mt-3 cursor-point"
				>
					Load more...
				</p>
			</Spin>

			<Drawer
				className={tableStyle.drawerRoot}
				size="large"
				contentWrapperStyle={{ width: "70%" }}
				placement="right"
				title={
					<div className="flex justify-end">
						<Button className={clsx([tableStyle.button], "text-end")}>
							Export as PDF
						</Button>
					</div>
				}
				open={openThreadDrawer}
				onClose={onCloseDrawer}
			>
				<div className={tableStyle.entryContainer}>
					<ThreadDrawer cve_id={cveID} />
				</div>
			</Drawer>
		</div>
	);
};

export { SatisficTable };

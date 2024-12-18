import React, { useState, useEffect, ReactNode, useRef } from "react";
import { Popover, Image, Spin, Descriptions } from "antd";
import clsx from "clsx";
// components
import { Table, Tag, Drawer } from "@/components";
import { ThreadDrawer } from "../thread-vulnerable-drawer/ThreadDrawer";
// helpers
import { convertESTDateFormat, interpolateColor } from "@/helpers";
// styles
import { tableStyles } from "./table.styles";
import { useTableStyles } from "@/styles/table/table.styles";
// types
import type { TableColumnType } from "@/components";
import { Vulnerability } from "./table.types";
// icons
import closeIcon from "../../../static/images/closeIcon.svg";

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
	const styles = tableStyles();
	const tableStyle = useTableStyles();

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
			width: 120,
			render: (value: string, _, index: number) => (
				<div
					className={clsx(
						[tableStyle.tdFirstCell, styles.tdSize],
						index % 2 === 0 ? tableStyle.tdStyleOdd : tableStyle.tdStyleEven
					)}
				>
					{convertESTDateFormat(value)}
				</div>
			),
		},
		{
			width: 250,
			title: "CVE ID",
			dataIndex: "cve_id",
			key: "created_at",
			render: (value: string, record, index: number) => {
				return (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
						<h3 onClick={() => showDrawer(value)} className="cursor-point">
							{value}
						</h3>
						<p className="text-ellipsis max-w-250 text-gray-500 mb-0">
							{dataSource[index].description}
							{/* {sampleData[index].description} */}
						</p>
					</div>
				);
			},
		},
		{
			title: "Vendor",
			dataIndex: "vendor",
			width: 100,
			render: (value, _, index: number) => {
				const array: any[] = value?.array ? value?.array?.slice(1) : [];
				const options: ReactNode[] = array.map(
					(item: string, index: number) => <p key={index}>{item}</p>
				);
				const content = <div>{options}</div>;

				return value?.array?.length !== 0 ? (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
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
											[styles.tagStyle, styles.innerTagStyle],
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
					</div>
				) : (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
						<div className="flex justify-center">-</div>
					</div>
				);
			},
		},
		{
			title: "Product",
			dataIndex: "product",
			width: 120,
			render: (value: any, _, index: number) => {
				const flatArray = value?.array?.flat(Infinity);

				const newArray: any[] = flatArray?.slice(1);
				const options: ReactNode[] = newArray?.map(
					(item: any, index: number) => <p key={index}>{item?.name}</p>
				);
				const content = <div>{options}</div>;

				return flatArray ? (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
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
									{flatArray && Array.isArray(flatArray)
										? flatArray[0]?.name
										: ""}
								</p>
								{!value.status ? (
									<Tag
										className={clsx([
											[styles.tagStyle, styles.innerTagStyle],
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
										{flatArray && flatArray.length > 0
											? flatArray.length - 1
											: 0}
									</span>
									<span> more</span>
								</Popover>
							) : (
								""
							)}
						</div>
					</div>
				) : (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
						<div className="flex justify-center">-</div>
					</div>
				);
			},
		},
		{
			title: "CVSS Score",
			dataIndex: "cvss_score",
			width: 150,
			render: (value: number, _, index: number) => {
				return value ? (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
						<Tag
							className={clsx([styles.tagStyle], "font-poppines")}
							style={{
								color: interpolateColor(value),
								borderColor: interpolateColor(value),
							}}
						>
							CVSS {value}
						</Tag>
					</div>
				) : (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column"
						)}
					>
						<Tag
							className={clsx(
								[styles.tagStyle, styles.noColor],
								"font-poppines"
							)}
						>
							-
						</Tag>
					</div>
				);
			},
		},
		{
			title: "CVSS Estimate",
			dataIndex: "cvss_estimate",
			width: 170,
			render: (value: string, _, index: number) => {
				let colorValue = "";
				switch (value) {
					case "HIGH":
						colorValue = styles.highColor;
						break;
					case "MEDIUM":
						colorValue = styles.mediumColor;
						break;
					default:
						colorValue = styles.noColor;
						break;
				}
				return (
					<div
						className={clsx([
							tableStyle.tdCell,
							styles.tdSize,
							index % 2 === 0 ? tableStyle.tdStyleOdd : tableStyle.tdStyleEven,
						])}
					>
						<Tag
							className={clsx([styles.tagStyle, colorValue], "font-poppines")}
						>
							{value ? value : <div>-</div>}
						</Tag>
					</div>
				);
			},
		},
		{
			title: "EPSS Score",
			dataIndex: "epss_score",
			width: 90,

			render: (value: any, _, index: number) => (
				<div
					className={clsx(
						[
							tableStyle.tdCell,
							styles.tdSize,
							index % 2 === 0 ? tableStyle.tdStyleOdd : tableStyle.tdStyleEven,
						],
						"flex justify-center"
					)}
				>
					{value ? `${(Number(value) * 100).toFixed(2)}%` : "-"}
				</div>
			),
		},
		{
			title: "Trend",
			dataIndex: "trend",
			width: 200,

			render: (value: any, _, index: number) => {
				return value ? (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex flex-column "
						)}
					>
						<Image src={value.graphURL} preview={false} height={42} />
						<span
							className="flex text-xs mt-2 mr-auto ml-auto"
							style={{ color: "#498DCE" }}
						>
							{value.articleCount !== 0 ? value.articleCount : "No"} Articles
						</span>
					</div>
				) : (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex justify-center"
						)}
					>
						-
					</div>
				);
			},
		},
		{
			title: "Patched",
			dataIndex: "patched",
			width: 120,
			render: (value: any, _, index: number) => {
				return value === undefined ? (
					<div
						className={clsx(
							[
								tableStyle.tdCell,
								styles.tdSize,
								index % 2 === 0
									? tableStyle.tdStyleOdd
									: tableStyle.tdStyleEven,
							],
							"flex justify-center"
						)}
					>
						-
					</div>
				) : (
					<div
						className={clsx([
							tableStyle.tdCell,
							styles.tdSize,
							index % 2 === 0 ? tableStyle.tdStyleOdd : tableStyle.tdStyleEven,
						])}
					>
						{convertESTDateFormat(value[0])}
					</div>
				);
			},
		},
		{
			title: "Exploit",
			dataIndex: "exploit",
			width: 120,
			render: (value: number, _, index: number) => (
				<div
					className={clsx([
						tableStyle.tdLastCell,
						styles.tdSize,
						index % 2 === 0 ? tableStyle.tdStyleOdd : tableStyle.tdStyleEven,
					])}
				>
					{convertESTDateFormat(value)}
				</div>
			),
		},
	];

	return (
		<div className="mt-4">
			<Table
				className={clsx([tableStyle.dataTable, styles.tableContainer])}
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
				className={styles.drawerRoot}
				size="large"
				title={null}
				width="60%"
				style={{ height: 740 }}
				placement="right"
				open={openThreadDrawer}
				onClose={onCloseDrawer}
				contentWrapperStyle={{ boxShadow: "none" }}
			>
				<div className={styles.entryContainer}>
					<ThreadDrawer cve_id={cveID} />
				</div>
			</Drawer>
		</div>
	);
};

export { SatisficTable };

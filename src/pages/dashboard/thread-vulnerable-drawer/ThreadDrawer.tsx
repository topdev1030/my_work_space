import { useState, ReactNode, useEffect } from "react";
import clsx from "clsx";

import { Drawer, Spin, DrawerProps, Typography, Button } from "@/components";

import { Col, Divider, Row, Timeline, Image, Flex } from "antd";
import {
	LaptopOutlined,
	ReadOutlined,
	StarOutlined,
	ArrowDownOutlined,
	CheckOutlined,
} from "@ant-design/icons";
// services
import { feedlyService } from "@/services";

import { useStyles } from "./ThreadDrawer.styles";

const { Text, Title } = Typography;

type ThreadDrawerProps = {
	open: boolean;
	onClose?: DrawerProps["onClose"];
	cve_id: string;
	children?: ReactNode;
};

const ThreadDrawer = ({
	open,
	onClose,
	cve_id,
	children,
}: ThreadDrawerProps) => {
	console.log("cve_id: ", cve_id);
	const [loadingThreatData, setLoadingThreatData] = useState<boolean>(false);
	const [dataSource, setDataSource] = useState<object>({} as any);

	const styles = useStyles();

	const fetchArticleEntry = async () => {
		setLoadingThreatData(true);

		// load article entry
		try {
			const entry = await feedlyService.getArticleDataByCVEID({
				cve_id: cve_id,
				param: {
					withStats: true,
					ck: 1733976442784,
					ct: "feedly.desktop",
					cv: "31.0.2499",
				},
			});
			console.log("Entry: ", entry);
			setDataSource(dataSource);
		} catch (error) {
			console.log("error: ", error);
		} finally {
			setLoadingThreatData(false);
		}
	};

	useEffect(() => {
		if (cve_id) {
			fetchArticleEntry();
		}
	}, [cve_id]);

	return (
		<Drawer
			title="Hello World"
			style={{ backgroundColor: "#141414" }}
			open={open}
			width={1200}
			onClose={onClose}
			placement="right"
		>
			<div className={clsx([styles.entryContainer], "font-medium")}>
				<Spin
					size="default"
					tip="Loading Vulnerable Data details..."
					spinning={loadingThreatData}
				>
					<div className={styles.entryHeader}>
						<Row justify="space-between" className="w-full">
							<Col span={8} className="justify-start flex flex-column">
								<Text style={{ color: "#f44336" }}>TRENDING</Text>
								<Text className="text-xl">CVE-2024-54143</Text>
								<Text className="text-base mt-1">
									Use of Weak Hash (CWE-328)
								</Text>
								<p className="text-xs mb-0">
									Published: Dec 6, 2024 / Updated: 5d ago
								</p>
							</Col>
							<Col span={8}>col-8</Col>
						</Row>
					</div>
					<div className={clsx([styles.entryContent], "gap-2")}>
						<div>
							<Text className="text-base font-bold">Summary</Text>
							<p className="text-base mt-1">
								A vulnerability has been discovered in openwrt/asu, an image on
								demand server for OpenWrt based distributions. The flaw is in
								the request hashing mechanism, which truncates SHA-256 hashes to
								only 12 characters. This significant reduction in entropy makes
								it feasible for an attacker to generate hash collisions. The
								vulnerability affects the security of the image building and
								distribution process for OpenWrt-based firmware.
							</p>
						</div>
						<div>
							<Text className="text-base font-bold">Impact</Text>
							<p className="text-base mt-1">
								The impact of this vulnerability is severe. An attacker can
								exploit this flaw to serve a previously built malicious image in
								place of a legitimate one, effectively poisoning the artifact
								cache. This allows the delivery of compromised images to
								unsuspecting users. The severity is amplified by the potential
								to combine this with other attacks, such as a command injection
								in Imagebuilder. This combination could allow malicious users to
								inject arbitrary commands into the build process, resulting in
								the production of malicious firmware images that are signed with
								the legitimate build key. The vulnerability has a CVSS v4 base
								score of 9.3, which is categorized as Critical severity. It has
								high impact on the confidentiality, integrity, and availability
								of the vulnerable system. This means that unauthorized access to
								sensitive information, unauthorized modification of system data,
								and significant disruption to system availability are all
								possible outcomes.
							</p>
						</div>
						<div>
							<Text className="text-base font-bold">Exploitation</Text>
							<p className="text-base mt-1">
								There is no evidence that a public proof-of-concept exists.
								There is no evidence of proof of exploitation at the moment.
							</p>
						</div>
						<div>
							<Text className="text-base font-bold">Patch</Text>
							<p className="text-base mt-1">
								A patch for this vulnerability is available. The issue has been
								fixed in commit 920c8a1 of the openwrt/asu project.
							</p>
						</div>
						<div>
							<Text className="text-base font-bold">Mitigation</Text>
							<p className="text-base mt-1">
								To mitigate this vulnerability, the following steps are
								recommended: 1. Update openwrt/asu to the latest version that
								includes the patch (commit 920c8a1) as soon as possible. 2. If
								immediate patching is not feasible, implement additional
								verification steps for image integrity. This could include full
								hash comparison or digital signature verification. 3. Closely
								monitor and audit the image building process for any suspicious
								activities or unexpected changes. 4. Review and enhance the
								overall security of the firmware build and distribution pipeline
								to prevent similar vulnerabilities in the future. 5. Educate
								users and administrators about the risks associated with this
								vulnerability and the importance of using only verified and
								properly signed firmware images.
							</p>
						</div>
					</div>
					<div className="mt-6">
						<p className="mb-0 word-break-all">
							CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MAT:X/MPR:X/MUI:X/MVC:X/MVI:X/MVA:X/MSC:X/MSI:X/MSA:X/S:X/AU:X/R:X/V:X/RE:X/U:X
						</p>
					</div>
					<div className="mt-6 flex items-center">
						<p className="mb-0 justify-between">TIMELINE</p>
						<Divider style={{ minWidth: 0, margin: "0 20px" }} />
						<Button variant="outlined" className={styles.button}>
							Highlight Events
						</Button>
					</div>
					<div className="mt-6">
						<Timeline
							items={[
								{
									color: "#6B6B6B",
									children: (
										<div className="flex flex-column gap-1">
											<Text className="text-base font-semibold">
												CVE Assignment
											</Text>
											<p className="text-xl">
												NVD published the first details for CVE-2024-54143
											</p>
											<p className="text-xs">Dec 6, 2024 at 12:15 PM</p>
										</div>
									),
								},
								{
									color: "#6B6B6B",
									children: "Solve initial network problems 2015-09-01",
								},
								{
									color: "#6B6B6B",
									children: "Technical testing 2015-09-01",
								},
								{
									color: "#6B6B6B",
									children: "Network problems being solved 2015-09-01",
								},
							]}
						/>
					</div>
					<div className="mt-6">
						<Image
							src="https://storage.googleapis.com/feedly-ml-public/cve-trends/card-graphs/v2.0/CVE-2024-54143-ee410dd61dbc8d3e81df60624d246eb2.svg"
							className="flex items-center w-full"
							preview={false}
						/>
					</div>
					<div className="mt-6 flex flex-column">
						<Divider orientation="left">AFFECTED SYSTEM</Divider>
						<Button
							variant="outlined"
							icon={<LaptopOutlined />}
							className={styles.button}
						>
							Optnwrt/openwrt
						</Button>
					</div>
					<div className="mt-6 flex flex-column">
						<Divider orientation="left">EXPLOITED</Divider>
						<Button
							variant="outlined"
							icon={<LaptopOutlined />}
							className={styles.button}
						>
							https://github.com/aramosf/cve-2024-42327
						</Button>
					</div>
					<div className="mt-6 flex flex-column">
						<Divider orientation="left">CWE-328 ATTACK PATTERNS</Divider>
						<div className="flex flex-column gap-1">
							<Button
								variant="outlined"
								icon={<LaptopOutlined />}
								className={styles.button}
							>
								CAPEC-461: Web Services API Signature Forgery Leveraging Hash
								Function Extension Weakness
							</Button>
							<Button
								variant="outlined"
								icon={<LaptopOutlined />}
								className={styles.button}
							>
								CAPEC-461: Web Services API Signature Forgery Leveraging Hash
								Function Extension Weakness
							</Button>
						</div>
					</div>
					<Row
						className="mt-10 gap-6 nowrap"
						justify="space-between"
						style={{ padding: "30px 0" }}
					>
						<Col span={16} className="justify-start flex flex-column">
							<article>
								<Text className="text-sm">REFERENCE</Text>
								<Flex vertical gap="middle" className="mt-4">
									<div
										className={clsx([styles.referenceContainer], "flex gap-3")}
									>
										<Image
											src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
											preview={false}
											width={120}
										/>
										<div className="flex flex-column gap-1">
											<Flex gap="middle" justify="space-between">
												<Text className="text-sm font-semibold text-gray-300">
													CVE-2024-50623 Vulnerability Identified in Cleo
													Software Products
												</Text>
												<Flex gap="small">
													<ReadOutlined />
													<StarOutlined />
													<ArrowDownOutlined />
													<CheckOutlined />
												</Flex>
											</Flex>
											<Text className="text-base mt-1">
												Threat Intelligence Report
											</Text>
											<p className="text-xs mb-0">
												A critical zero-day vulnerability, CVE-2024-50623, has
												been identified in Cleo software products, allowing
												unauthorized file operations and prompting calls for
												enhanced security measures.
											</p>
										</div>
									</div>
								</Flex>
							</article>
						</Col>
						<Col span={8} className="flex flex-column items-start">
							<Text className="text-sm">CVSS V3.1</Text>
							<Flex vertical gap={10} className="mt-4">
								<div>
									<Text className="text-sm">Attack Vector: </Text>
									<Text className="text-sm text-gray-300">Network</Text>
								</div>
								<div>
									<Text className="text-sm">Attack Vector: </Text>
									<Text className="text-sm text-gray-300">Network</Text>
								</div>
								<div>
									<Text className="text-sm">Attack Vector: </Text>
									<Text className="text-sm text-gray-300">Network</Text>
								</div>
								<div>
									<Text className="text-sm">Attack Vector: </Text>
									<Text className="text-sm text-gray-300">Network</Text>
								</div>
								<div>
									<Text className="text-sm">Attack Vector: </Text>
									<Text className="text-sm text-gray-300">Network</Text>
								</div>
							</Flex>
						</Col>
					</Row>
				</Spin>
			</div>
		</Drawer>
	);
};

export { ThreadDrawer };

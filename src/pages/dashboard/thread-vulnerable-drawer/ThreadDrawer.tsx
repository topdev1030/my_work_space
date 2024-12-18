import {
	useState,
	useMemo,
	useCallback,
	useEffect,
	Fragment,
	useRef,
} from "react";
import { message, Divider, Image } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import clsx from "clsx";
import { useReactToPrint } from "react-to-print";

// components
import {
	Button,
	Tag,
	Typography,
	Timeline,
	Spin,
	CVSSDial,
	SeverityDial,
} from "@/components";

// icons
import { Icons } from "@/theme/icons";
import { FilePdfOutlined } from "@ant-design/icons";
import patchedIcon from "../../../static/images/patched_icon.svg";
import webIcon from "../../../static/images/web_icon.svg";

// service
import { feedlyService } from "@/services";

// redux
import { useAppSelector } from "@/redux";
import { selectAccessToken } from "@/redux/auth";

// utils
import {
	getCVEFeatures,
	getCVETimelineItems,
	generateCVEOverviewText,
} from "../../news/vuln-drawer/NewsVulnDrawer.utils";

// types
import type { FeedlyCVE, FeedlyCVEEvent } from "@/types";
import type { SeverityDialProps } from "@/components";

// constants
import { initVulnCVE } from "../../news/vuln-drawer/NewsVulnDrawer.constants";

// styles
import { useStyles } from "../../news/vuln-drawer/NewsVulnDrawerCVE.styles";
import { usethreadDrawerStyles } from "./ThreadDrawer.styles";

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;

type ThreadDrawerProps = {
	cve_id: string;
};

const ThreadDrawer = ({ cve_id }: ThreadDrawerProps) => {
	const [vulnCVE, setVulnCVE] = useState<FeedlyCVE>(initVulnCVE);
	const [CVEEvents, setCVEEvents] = useState<FeedlyCVEEvent[]>([]);
	const [graphSVG, setGraphSVG] = useState<string>("");
	const [loadingCVEData, setLoadingCVEData] = useState<boolean>(false);

	const accessToken = useAppSelector(selectAccessToken);
	const drawerRef = useRef<HTMLDivElement>(null);

	const styles = useStyles();
	const threadDrawerStyles = usethreadDrawerStyles();

	const onOpenNVD = useCallback(() => {
		window.open(`https://nvd.nist.gov/vuln/detail/${vulnCVE.cveid}`, "_blank");
	}, [vulnCVE.cveid]);

	const onCopyCVEOverview = useCallback(async () => {
		try {
			const overviewText = generateCVEOverviewText(vulnCVE);
			await navigator.clipboard.writeText(overviewText);

			// notify message
			message.success("Copied to clipboard");
		} catch (error) {
			console.log(error);
			message.error("Copy to clipboard failed, try again later.");
		}
	}, [vulnCVE]);

	const fetchCVEData = async () => {
		setLoadingCVEData(true);
		try {
			// get CVE id
			const cveId = cve_id.split("&")[0].trim();

			// get cve & events
			const [cve, events] = await Promise.all([
				feedlyService.getThreatEntity({
					token: accessToken,
					resource_id: cveId,
				}),
				feedlyService.getCVEEvents({
					token: accessToken,
					cve_id: cveId,
				}),
			]);

			setVulnCVE(cve as FeedlyCVE);
			setCVEEvents(events);

			// load graph svg
			const { data: svgContent } = await axios.get((cve as FeedlyCVE).graphUrl);
			setGraphSVG(svgContent.replace(/ns0:path/g, "path"));
		} catch (error) {
			console.log(error);
		} finally {
			setLoadingCVEData(false);
		}
	};

	useEffect(() => {
		if (accessToken && cve_id) {
			fetchCVEData();
		}
	}, [accessToken, cve_id]);

	const timelineItems = useMemo(
		() => getCVETimelineItems(vulnCVE.cveid, CVEEvents),
		[vulnCVE, CVEEvents]
	);

	const features = useMemo(() => getCVEFeatures(vulnCVE), [vulnCVE]);

	const {
		label,
		description,
		cvssV3,
		cweIds = [],
		publishedDate,
		publicationDateInfo = [],
		executiveSummary,
		affectedProducts = [],
		affectedProductsEstimate = [],
		idMapping = [],
		exploits = [],
		proofOfExploits = [],
		patchDetails = [],
	} = vulnCVE;

	const renderMeterDial = () => {
		const { cvssCategoryEstimate } = vulnCVE;
		const cvss = vulnCVE?.cvssV4
			? vulnCVE?.cvssV4?.baseScore
			: vulnCVE?.cvssV3?.baseScore;

		if (cvss) {
			return <CVSSDial cvss={cvss} epss={Number(vulnCVE.epssScore)} />;
		}
		if (cvssCategoryEstimate) {
			return (
				<SeverityDial
					severity={cvssCategoryEstimate as SeverityDialProps["severity"]}
				/>
			);
		}
		return null;
	};

	const handlePrint = useReactToPrint({
		content: () => drawerRef.current,
		pageStyle: `@media print {
			body {
				-webkit-print-color-adjust: exact;
				hyphens: none !important;
  			-webkit-hyphens: none !important; 
  			-ms-hyphens: none !important;
			}
			.drawer-container {
				padding-top: 20px;
				word-break: keep-all !important;
			}
		}`,
	});

	return (
		<Spin size="default" tip="Loading CVE info..." spinning={loadingCVEData}>
			<div
				ref={drawerRef}
				className="drawer-container dark-theme"
				id="printable-content"
			>
				<div className={clsx(styles.header, "drawer-header")}>
					<div className={styles.heading}>
						{features.length > 0 && (
							<div className={styles.features}>
								{features.map(({ text }, idx) => (
									<Fragment key={idx}>
										{idx > 0 && (
											<span className={styles.featureSeparator}>•</span>
										)}
										{idx > 0 ? (
											<Text className={clsx([styles.feature], "red-text")}>
												{text}
											</Text>
										) : (
											<Text
												className={clsx([styles.trendsFeature], "orange-text")}
											>
												{text}
											</Text>
										)}
									</Fragment>
								))}
							</div>
						)}
						<Title className={styles.label}>{label}</Title>
						{cweIds.length > 0 && (
							<Paragraph className={styles.cweInfo}>
								{cweIds[0].name} ({cweIds[0].cweID})
							</Paragraph>
						)}
						{publishedDate && publicationDateInfo.length > 0 && (
							<Paragraph className={styles.metadata}>
								Published on {dayjs(publishedDate).format("MM/DD/YYYY")} |
								Updated: {dayjs(publicationDateInfo[0].publishedDate).fromNow()}
							</Paragraph>
						)}
						<div className={clsx([styles.actions])}>
							<Button
								className="export-button"
								icon={<Icons glyph="nvd-outlined" />}
								onClick={() => onOpenNVD()}
							/>
							<Divider
								className={clsx([styles.divider], "export-button")}
								type="vertical"
							/>
							<Button
								className="export-button"
								icon={<Icons glyph="copy-outlined" />}
								onClick={() => onCopyCVEOverview()}
							/>
							<Divider
								className={clsx([styles.divider], "export-button")}
								type="vertical"
							/>

							<div className="flex items-center export-button">
								<FilePdfOutlined className={styles.pdfIcon} />
								<a onClick={handlePrint} className={clsx(styles.pdfLabel)}>
									Export as PDF
								</a>
							</div>
						</div>
					</div>
					<div className={styles.dial}>{renderMeterDial()}</div>
				</div>
				<div className={clsx(styles.content, "drawer-multiple-content")}>
					{/* Summary */}
					<div className={styles.section}>
						<div className={styles.sectionTitle}>
							<Title level={2}>Summary</Title>
						</div>
						<div className={styles.sectionContent}>
							<Paragraph className={styles.description}>
								{description}
							</Paragraph>
						</div>
					</div>

					{/* Impact */}
					{executiveSummary?.impact && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title level={2}>Impact</Title>
							</div>
							<div className={styles.sectionContent}>
								<Paragraph className={styles.description}>
									{executiveSummary?.impact}
								</Paragraph>
							</div>
						</div>
					)}

					{/* Exploitation */}
					{executiveSummary?.impact && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title level={2}>Exploitation</Title>
							</div>
							<div className={styles.sectionContent}>
								<Paragraph className={styles.description}>
									{executiveSummary?.exploitation}
								</Paragraph>
							</div>
						</div>
					)}

					{/* Patch */}
					{executiveSummary?.patch && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title level={2}>Patch</Title>
							</div>
							<div className={styles.sectionContent}>
								<Paragraph className={styles.description}>
									{executiveSummary?.patch}
								</Paragraph>
							</div>
						</div>
					)}

					{/* Mitigation */}
					{executiveSummary?.mitigation && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title level={2}>Mitigation</Title>
							</div>
							<div className={styles.sectionContent}>
								<Paragraph className={styles.description}>
									{executiveSummary?.mitigation}
								</Paragraph>
							</div>
						</div>
					)}

					{/* CVSS Vector */}
					{cvssV3?.vectorString && (
						<Paragraph className={styles.vector}>
							{cvssV3.vectorString}
						</Paragraph>
					)}

					{/* Timeline */}
					<div className={styles.section}>
						<div className={styles.sectionTitle}>
							<Title className="orange-text" level={3}>
								TIMELINE
							</Title>
						</div>
						<div className={styles.sectionContent}>
							<Timeline
								className={styles.timeline}
								items={timelineItems.map(
									({ title, ts, description: desc, sourceName, url }) => ({
										children: (
											<div className={styles.timelineItem}>
												<Title className={styles.timelineTitle}>{title}</Title>
												<Paragraph className={styles.timelineDescription}>
													{desc}
												</Paragraph>
												<div className={styles.timelineMetadata}>
													<Text>
														{dayjs(ts).format("MMM D, YYYY [at] h:mm a")}
													</Text>
													{sourceName && <Text>/</Text>}
													{url ? (
														<Button type="link" href={url} target="_blank">
															{sourceName}
														</Button>
													) : (
														<Text>{sourceName}</Text>
													)}
												</div>
											</div>
										),
									})
								)}
							/>
							{graphSVG && (
								<div
									className={styles.eventsGraph}
									dangerouslySetInnerHTML={{ __html: graphSVG }}
								/>
							)}
						</div>
					</div>

					{/* Affected Systems */}
					{affectedProducts?.length > 0 && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title className="orange-text" level={3}>
									AFFECTED SYSTEMS
								</Title>
							</div>
							<div className={styles.sectionContent}>
								<div className={styles.tags}>
									{affectedProducts?.map(({ vendor, products = [] }, idx) => (
										<Tag
											key={`affected_system_${idx}`}
											className={styles.tag}
											onClick={onOpenNVD}
										>
											<Icons glyph="screen-outlined" />
											<Text className={clsx([styles.tagText], "grey-text")}>
												{vendor}
												<span>/</span>
												{products.map(({ name }) => name).join(", ")}
											</Text>
										</Tag>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Affected Systems */}
					{!affectedProducts ||
						(affectedProductsEstimate?.length > 0 && (
							<div className={styles.section}>
								<div className={styles.sectionTitle}>
									<Title className="orange-text" level={3}>
										AFFECTED SYSTEMS
									</Title>
								</div>
								<div className={styles.sectionContent}>
									<div className={styles.tags}>
										{affectedProductsEstimate?.map(
											({ vendor, products = [] }, idx) => (
												<>
													<Tag
														key={`affected_system_${idx}`}
														className={styles.tag}
														onClick={onOpenNVD}
													>
														<Icons glyph="screen-outlined" />
														<Text
															className={clsx([styles.tagText], "grey-text")}
														>
															{vendor}
															<span>/</span>
															{products.map(({ name }) => name).join(", ")}
														</Text>
													</Tag>
													<br />
												</>
											)
										)}
									</div>
								</div>
							</div>
						))}

					{/* Attack Patterns */}
					{idMapping?.length > 0 && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title className="orange-text" level={3}>
									{" "}
									{idMapping[0].id} ATTACK PATTERNS
								</Title>
							</div>
							<div className={styles.sectionContent}>
								<div className={styles.tags}>
									{idMapping?.map(({ id, name }, idx) => (
										<Tag
											key={`attack_patterns_${idx}`}
											className={styles.tag}
											onClick={onOpenNVD}
										>
											<Image src={webIcon} preview={false} />
											<Text className={clsx([styles.tagText], "grey-text")}>
												{id}
												<span>:</span>
												{name}
											</Text>
										</Tag>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Exploits */}
					{exploits.length > 0 && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title className="orange-text" level={3}>
									EXPLOITS
								</Title>
							</div>
							<div className={styles.sectionContent}>
								<div className={styles.tags}>
									{exploits.map((url, idx) => (
										<Tag
											key={`exploit_${idx}`}
											className={styles.tag}
											onClick={() => window.open(url, "_blank")}
										>
											<Icons glyph="target-outlined" />
											<Text className={clsx([styles.tagText], "grey-text")}>
												{url}
											</Text>
										</Tag>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Proof of Exploits */}
					{proofOfExploits.length > 0 && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title className="orange-text" level={3}>
									PROOF OF EXPLOIT
								</Title>
							</div>
							<div className={styles.sectionContent}>
								<div className={styles.tags}>
									{proofOfExploits.map((url, idx) => (
										<Tag
											key={`proof_of_exploit_${idx}`}
											className={styles.tag}
											onClick={() => window.open(url, "_blank")}
										>
											<Icons glyph="target-outlined" />
											<Text className={clsx([styles.tagText], "grey-text")}>
												{url}
											</Text>
										</Tag>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Patches */}
					{patchDetails.length > 0 && (
						<div className={styles.section}>
							<div className={styles.sectionTitle}>
								<Title className="orange-text" level={3}>
									PATCHES
								</Title>
							</div>
							<div className={styles.sectionContent}>
								<div className={styles.tags}>
									{patchDetails.map(({ title, url }, idx) => (
										<Tag
											key={`patch_${idx}`}
											className={styles.tag}
											onClick={() => window.open(url, "_blank")}
										>
											<Image src={patchedIcon} preview={false} />
											<Text className={clsx([styles.tagText], "grey-text")}>
												{title}
											</Text>
										</Tag>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Spin>
	);
};

export { ThreadDrawer };

import { useState, useEffect, useCallback } from "react";
import { Image, Spin } from "antd";
import clsx from "clsx";
// components
import { Typography, Card, Select } from "@/components/atoms";
// services
import { feedlyService } from "@/services";
// constants
import { months } from "./newsFeed.constant";
// images
import ImageNotFount from "../../static/images/imageNotFound.png";
// styles
import { useStyles } from "./newsFeed.styles";
import { useFormStyles } from "@/styles/table/form.style";

const { Text } = Typography;

const data_options = [
	{
		label: "Core Tech Stacks",
		value: "Core Tech Stacks",
	},
	{
		label: "Insurance",
		value: "Insurance",
	},
	{
		label: "Cyber Security News",
		value: "Cyber Security News",
	},
	{
		label: "Security Advisories",
		value: "Security Advisories",
	},
];

const NewsFeed = ({ accessToken }) => {
	const [loadingFeedly, setLoadingFeedly] = useState<boolean>(false);
	const [feedlyData, setFeedlyData] = useState({} as any);

	const styles = useStyles();
	const formStyles = useFormStyles();

	const fetchFeedlyData = async () => {
		setLoadingFeedly(true);
		try {
			const feedlyDatas = await feedlyService.getFeedData({
				token: accessToken,
			});
			setFeedlyData(feedlyDatas as {});
		} catch (err) {
			console.log(err);
			setLoadingFeedly(false);
		} finally {
			setLoadingFeedly(false);
		}
	};

	function formatPublishedDate(epochMillis) {
		const date = new Date(epochMillis);
		const month = months[date.getMonth()];
		const day = date.getDate();
		const year = date.getFullYear();

		return `${month} ${day}, ${year}`;
	}

	useEffect(() => {
		if (accessToken) {
			fetchFeedlyData();
		}
	}, [accessToken]);

	return (
		<div className={styles.rightBar}>
			<Select
				placeholder="Core Tech Stacks"
				className="mb-7"
				options={data_options}
			/>
			<div className="fixed">
				<div className={styles.feedContainer}>
					<Text className={styles.feedHeadline}>NEWS FEED</Text>
					<Text className={styles.feedTitle}>Cyber Security Updates</Text>
				</div>
				<div className={styles.newsContainer}>
					<div className={styles.newsItems}>
						{loadingFeedly ? (
							<Spin size="large" />
						) : (
							feedlyData.items?.map((feed: any, index: number) =>
								index === 0 ? (
									<a
										href={feed?.originId}
										target="_blank"
										rel="noopener noreferrer"
										key={feed.id}
									>
										<Card className={styles.newsCard} key={index}>
											<div className={styles.newsCardContainer}>
												<Image
													width="100%"
													preview={false}
													className={styles.newsImage}
													src={feed?.visual?.url || ImageNotFount}
													style={{ minHeight: "230px" }}
												/>

												<div className={styles.newsDescription}>
													<Text className={styles.newsTitle}>{feed.title}</Text>
													<Text className={styles.newsDate}>
														{feed.origin.title}{" "}
														{formatPublishedDate(feed.published)}
													</Text>
												</div>
											</div>
										</Card>
									</a>
								) : (
									<a
										href={feed?.originId}
										target="_blank"
										rel="noopener noreferrer"
										key={feed.id}
									>
										<Card className={styles.newsCard} key={index}>
											<div className={styles.cardContainer}>
												<Image
													preview={false}
													className={styles.newsImage}
													src={feed?.visual?.url || ImageNotFount}
													style={{ width: "80px", minHeight: "68px" }}
												/>

												<div className={styles.titleContainer}>
													<Text className={styles.newsTitle}>{feed.title}</Text>
													<Text className={styles.newsDate}>
														{feed.origin.title}{" "}
														{formatPublishedDate(feed.published)}
													</Text>
												</div>
											</div>
										</Card>
									</a>
								)
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { NewsFeed };

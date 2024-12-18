import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout } from "antd";

// @redux
import { useAppSelector } from "@/redux";
import { selectAccessToken } from "@/redux/auth";

// components
import { SideBar } from "@/components/organisms";

// styles
import { useStyles } from "./BaseLayout.styles";
import { FooterBar } from "@/components/organisms/footer";
import { NewsFeed } from "@/pages/newsFeedly";
import clsx from "clsx";

const { Content } = Layout;

interface BaseLayoutProps {
	className?: string;
}

const BaseLayout = withAuthenticationRequired(
	({ className }: BaseLayoutProps) => {
		const accessToken = useAppSelector(selectAccessToken);
		const styles = useStyles();
		const location = useLocation();

		return (
			<Layout className={styles.layoutStyle}>
				<SideBar />
				<Layout>
					<Content className={styles.contentStyle}>
						<Outlet />
					</Content>
					<FooterBar />
				</Layout>
				{location.pathname === "/dashboard" && (
					<NewsFeed accessToken={accessToken} />
				)}
			</Layout>
		);
	}
);

export { BaseLayout };

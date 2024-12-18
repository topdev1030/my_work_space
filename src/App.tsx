import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "react-jss";
import { ConfigProvider } from "antd";

// theme
import { theme } from "@/theme";
// redux
import { useAppSelector } from "@/redux";
import { toggleState } from "@/redux/toggleTheme";

// pages
import {
	Home,
	News,
	Dashboard,
	CustomerReports,
	CustomerUploads,
	AdminReports,
	AdminUploads,
	VendorMonitoring,
	AdminMessages,
} from "@/pages";

// components
import { BaseLayout, RouteGuard } from "@/components";
// types
import { USER_ROLE } from "@/types";
// configs
import config from "./config";
// styles
import "./styles/layout.css";

const darkThemeColors = theme.colors;
const lightThemeColors = theme.lightColors;

const App = () => {
	const { isToggled } = useAppSelector(toggleState);

	const theme = {
		colors: isToggled ? darkThemeColors : lightThemeColors,
	};

	return (
		<ThemeProvider theme={theme}>
			<ConfigProvider
				theme={{
					token: {
						...theme.colors,
						fontFamily: "Poppins-Regular",
					},
					components: {
						Table: {
							headerSplitColor: "transparent",
						},
						Timeline: {
							dotBg: "#83C8EE",
							dotBorderWidth: 0,
							tailColor: "#83C8EE",
							itemPaddingBottom: 20,
						},
					},
				}}
			>
				<BrowserRouter>
					<Routes>
						{/* Home Page */}
						<Route path="/" element={<Home />} />
						{/* <Route path="/version" element={<div>{{config.api.mode}'v1'}</div>} /> */}
						<Route
							path="/version"
							element={<div>{`${config.api.mode} -v1.3`}</div>}
						/>

						{/* Auth Pages */}
						<Route element={<BaseLayout />}>
							{/* Common */}
							<Route path="/dashboard" element={<Dashboard />} />

							{/* Admin */}
							<Route element={<RouteGuard roles={[USER_ROLE.ADMIN]} />}>
								<Route path="/admin/reports" element={<AdminReports />} />
								<Route path="/admin/uploads" element={<AdminUploads />} />
								<Route path="/admin/messages" element={<AdminMessages />} />
								<Route
									path="/admin/vendor-monitoring"
									element={<VendorMonitoring />}
								/>
								<Route path="/admin/news" element={<News />} />
							</Route>

							{/* Customer */}
							<Route element={<RouteGuard roles={[USER_ROLE.CUSTOMER]} />}>
								<Route path="/reports" element={<AdminReports />} />
								<Route path="/uploads" element={<AdminUploads />} />
								<Route path="/news" element={<News />} />
								<Route
									path="/intel-hub/reports"
									element={<CustomerReports />}
								/>
								<Route
									path="/intel-hub/uploads"
									element={<CustomerUploads />}
								/>
							</Route>
						</Route>

						{/* Not Found Pages */}
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</BrowserRouter>
			</ConfigProvider>
		</ThemeProvider>
	);
};

export default App;

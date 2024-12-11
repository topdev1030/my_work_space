import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

import { Image, Layout, Menu, MenuProps } from "antd";

import { useAuth0 } from "@auth0/auth0-react";

// redux
import { useAppDispatch, useAppSelector } from "@/redux";
import { selectAuth, setAccessToken, getUserInfo } from "@/redux/auth";

// assets
import ImgLogo from "@/static/images/logo.png";
import { useStyles } from "./Sidebar.styles";

// Icons
import messageIcon from "../../../static/images/messages.png";
import uploadIcon from "../../../static/images/upload.png";
import Dashboard from "../../../static/images/Dashboard_1.svg";
import reportIcon from "../../../static/images/reports.png";
import logoutIcon from "../../../static/images/logout.png";
import settingIcon from "../../../static/images/setting.svg";
import vendorMornitoringIcon from "../../../static/images/vendor-monitoring.svg";

// Components
import { Typography } from "@/components/atoms";

// config
import config from "@/config";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;
const { Text } = Typography;

const SideBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { accessToken } = useAppSelector(selectAuth);

  const styles = useStyles();
  const location = useLocation();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const items: MenuItem[] = [
    {
      key: "/dashboard",
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <Image width={30} height={30} preview={false} src={Dashboard} />,
    },
    {
      key: "/admin/reports",
      label: <Link to="/admin/reports">Reports</Link>,
      icon: <Image width={35} height={35} preview={false} src={reportIcon} />,
    },
    {
      key: "/admin/uploads",
      label: <Link to="/admin/uploads">Uploads</Link>,
      icon: <Image width={35} height={35} preview={false} src={uploadIcon} />,
    },
    {
      key: "/admin/messages",
      label: <Link to="/admin/messages">Messages</Link>,
      icon: <Image width={35} height={35} preview={false} src={messageIcon} />,
    },
    {
      key: "/admin/vendor-monitoring",
      label: <Link to="/admin/vendor-monitoring">Vendor Monitoring</Link>,
      icon: (
        <Image
          width={30}
          height={30}
          preview={false}
          src={vendorMornitoringIcon}
        />
      ),
    },
  ];

  const bottomItems: MenuItem[] = [
    {
      key: "/admin/settings",
      label: <Link to="/admin/settings">Settings</Link>,
      icon: <Image width={30} height={30} preview={false} src={settingIcon} />,
    },
    {
      key: "/admin/messages",
      label: (
        <Text onClick={() => onLogout()} className={styles.logoutTitle}>
          Log Out
        </Text>
      ),
      icon: <Image width={35} height={35} preview={false} src={logoutIcon} />,
    },
  ];

  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: config.auth0.returnTo,
      },
    });
  };

  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: config.auth0.audience,
        },
      });
      dispatch(setAccessToken(token));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAccessToken();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo(accessToken));
    }
  }, [accessToken]);

  return (
    <Sider className={styles.siderStyle}>
      <div>
        <div
          className={styles.logoContainer}
          onClick={() => navigate("/dashboard")}
        >
          <img className={styles.logoImg} src={ImgLogo} alt="logo" />
          <Text className={styles.logoTitle}>Threat Intelligence</Text>
        </div>
        <div className={styles.profileCardContainer}>
          <Image
            width={85}
            preview={false}
            className={styles.imgAvatar}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <div className={styles.cardDescription}>
            <Text className={styles.cardGreetings}>Welcome Back</Text>
            <Text className={styles.cardProfileName}>Benjamin Garcia</Text>
            <Text className={styles.cardContact}>benjamingarcia@gmail.com</Text>
          </div>
        </div>
        <Menu
          className={styles.menuItem}
          openKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </div>

      <Menu
        className={clsx(styles.menuItem, styles.bottomMenuItem)}
        openKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={bottomItems}
      />
    </Sider>
  );
};

export { SideBar };

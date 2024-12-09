import { Col, Row, Image } from "antd";
import { Typography, Card } from "@/components/atoms";
import cx from "clsx";

// constants
import { weeklyStatsData as stats } from "../Dashboard.contants";

// Import Icon assets
import dashboardIcon_1 from "../../../static/images/dashboard_icons_1.png";
import dashboardIcon_2 from "../../../static/images/dashboard_icons_2.png";
import dashboardIcon_3 from "../../../static/images/dashboard_icons_3.png";
import dashboardIcon_4 from "../../../static/images/dashboard_icons_4.png";

import { useStyles } from "./StatsComponents.styles";

const { Title, Text } = Typography;

const StatsComponents = () => {
  const styles = useStyles();

  const statsData = [
    {
      title: "LOW",
      subtitle: "Dark web chatter (Volume)",
      icon: (
        <Image
          width={50}
          height={50}
          preview={false}
          src={dashboardIcon_1}
          className={cx({
            [styles.statsIcon]: true,
            [styles.statsTextSuccess]: stats.chatter === "low",
            [styles.statsTextDanger]: stats.chatter === "high",
          })}
        />
      ),
      background: "linear-gradient(75.78deg, #232331 11.71%, #3C290E 134.63%)",
    },
    {
      title: stats.thirdAlerts.toLocaleString(),
      subtitle: "3rd and 4th party alerts",
      icon: (
        <Image
          width={50}
          height={50}
          preview={false}
          src={dashboardIcon_2}
          className={cx(styles.statsIcon, styles.statsTextWarning)}
        />
      ),
      background: "linear-gradient(75.78deg, #232331 11.71%, #3C290E 134.63%)",
    },
    {
      title: stats.breachAlerts.toLocaleString(),
      subtitle: "Breach Alerts",
      icon: (
        <Image
          width={50}
          height={50}
          preview={false}
          src={dashboardIcon_3}
          className={cx(styles.statsIcon, styles.statsTextDanger)}
        />
      ),
      background: "linear-gradient(75.78deg, #232331 11.71%, #3C290E 134.63%)",
    },
    {
      title: (
        <>
          {stats.malwareFamilies.toLocaleString()}{" "}
          <sup
            style={{
              verticalAlign: "-0.25em",
              lineHeight: "1",
            }}
          >
            {stats.malwareFamiliesMargin}
          </sup>
        </>
      ),
      subtitle: "Malware Families",
      icon: (
        <Image
          width={50}
          height={50}
          preview={false}
          src={dashboardIcon_4}
          className={cx({
            [styles.statsIcon]: true,
            [styles.statsTextSuccess]: stats.malwareFamiliesMargin > 0,
            [styles.statsTextOrange]: stats.malwareFamiliesMargin < 0,
          })}
        />
      ),
      background: "linear-gradient(75.78deg, #232331 11.71%, #3C290E 134.63%)",
    },
  ];

  return (
    <div className={styles.statsContainer}>
      <Row gutter={[24, 24]}>
        {statsData.map((item, index) => (
          <Col xs={24} sm={18} md={16} lg={12} key={index}>
            <Card
              className={styles.statsCard}
              style={{
                background: item.background,
              }}
            >
              <div className={styles.chatterContainer}>
                <Title className={styles.statsTitle}>{item.title}</Title>
                <Text type="secondary" className={styles.statsValue}>
                  {item.subtitle}
                </Text>
              </div>
              {item.icon}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { StatsComponents };

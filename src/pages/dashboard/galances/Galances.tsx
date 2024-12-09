import { useNavigate } from "react-router-dom";
// antd components
import { Col, Row } from "antd";
import { Card } from "@/components/atoms";
import { ArrowRightOutlined } from "@ant-design/icons";
// types
import { GalanceProps } from "./Galances.types";
// styles
import { useStyles } from "./Galances.styles";

const Galances: React.FC<GalanceProps> = ({
  totalReports,
  totalUploads,
  totalMessages,
}) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const galanceData = [
    {
      title: "Reports Created",
      url: "reports",
      value: `${totalReports}`,
      color: "#C38A39",
    },
    {
      title: "Uploaded Files",
      url: "uploads",
      value: `${totalUploads}`,
      color: "#A5F167",
    },
    {
      title: "Messages Sent",
      url: "messages",
      value: `${totalMessages}`,
      color: "#72C3F1",
    },
  ];

  const handleRedirect = (url: String) => {
    navigate(`/admin/${url}`);
  };

  return (
    <div className={styles.galanceContainer}>
      <h2 className={styles.galanceTitle}>Data at a glance</h2>
      <Row gutter={16} justify="space-between" style={{ marginTop: 30 }}>
        {galanceData.map((card, index) => (
          <Col key={index} xs={16} sm={14} md={12} lg={6}>
            <Card
              className={styles.galanceCard}
              style={{ backgroundColor: card.color }}
              hoverable
            >
              <h3 className={styles.galanceSubTitle}>{card.title}</h3>
              <h1 className={styles.galanceValue}>{card.value}</h1>
              <div
                className={styles.galanceViewAll}
                onClick={() => handleRedirect(card.url)}
              >
                <span
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontFamily: "Poppins-medium",
                  }}
                >
                  View All
                </span>
                <ArrowRightOutlined className={styles.viewAllIcon} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { Galances };

import { Typography } from "antd";
import { Layout } from "antd";

import { useStyles } from "./Head.styles";

const { Text } = Typography;
const { Header } = Layout;

const Head = () => {
  const styles = useStyles();

  return (
    <Header className={styles.headerStyle}>
      <Text className={styles.title}>Vulnerability Dashboard</Text>
    </Header>
  );
};

export { Head };

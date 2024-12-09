import { Layout } from "antd";

import { useStyles } from "./FooterBar.styles";

const { Footer } = Layout;

const FooterBar = () => {
  const styles = useStyles();

  return (
    <Footer className={styles.footerStyle}>
      <p>© 2024 Omega Consulting. All Rights Reserved.</p>
    </Footer>
  );
};

export { FooterBar };

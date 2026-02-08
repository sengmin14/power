import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.infoSection}>
          <h2 className={styles.siteName}>캐치마인드</h2>
          <p className={styles.projectName}>
            <strong>도련님도시락</strong> | 김동민, 김수민, 김유진, 진성민
          </p>
        </div>

        <div className={styles.contactSection}>
          <p>고객지원: <a href="mailto:s6220kim@gmail.com">support@notreally.com</a></p>
          <p className={styles.copyright}>© 2026 CatchMind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
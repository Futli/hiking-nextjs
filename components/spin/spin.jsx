import styles from "./spin.module.scss";
import { Spinner } from 'react-bootstrap';

export const Spin = () => {
  
  return (
      <Spinner 
        animation="border"
        variant="primary"
        className={styles.kc_page_content_loading} 
      />
  );
}
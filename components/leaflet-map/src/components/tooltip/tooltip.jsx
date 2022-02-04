import styles from "./tooltip.module.scss";
import { Card } from "react-bootstrap";
import Link from "next/link";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export default function TooltipModal({ title, img, link }) {
  return (
    <Link href={link} passHref >
      <div className={styles.tooltip}>
        <div className={styles.title}>{title}</div>
        {img && (
          <Card.Img
            className={styles.placeImage}
            variant="top"
            src={`${BASE_URL}/images/${img}.jpg`}
          />
        )}
      </div>
    </Link>
  );
}

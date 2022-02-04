import RouteLengthSvg from '/public/route-length.svg';
import RouteHeightDifferenceSvg from '/public/route-height-difference.svg';
import RouteDurationSvg from '/public/route-duration.svg';
import styles from './mobile-stats.module.scss';

export default function MobileStats({ className, length, heightDifference, duration }) {
  return (
    <ul className={className ? `${styles.wrapper} ${className}` : styles.wrapper}>
      <li className={styles.statItem}>
        <span className={styles.iconWrapper}>
          <RouteLengthSvg className={styles.statIcon}/>
        </span>
        {length}
      </li>
      <li className={styles.statItem}>
        <span className={styles.iconWrapper}>
          <RouteHeightDifferenceSvg className={styles.statIcon} />
        </span>
        {heightDifference}
      </li>
      <li className={styles.statItem}>
        <span className={styles.iconWrapper}>
          <RouteDurationSvg className={styles.statIcon} />
        </span>
        {duration}
      </li>
    </ul>
  );
}

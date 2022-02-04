import styles from "./stats-table.module.scss";

export default function StatsTable({
  className,
  markColor, 
  distance,
  duration,
  heightDifference,
  routsCount,
  placesCount,
  price,
}) {
  return (
    <table className={className ? `${styles.table} ${className}` : styles.table}>
      <tbody>
        {markColor && (
          <tr className={styles.row}>
            <td className={styles.cell}>Метка на местности</td>
            <td className={styles.cell}><span className={styles.colorMark} style={{ backgroundColor: markColor }}/></td>
          </tr>
        )}
        {distance && (
          <tr className={styles.row}>
            <td className={styles.cell}>Протяженность</td>
            <td className={`${styles.cell} ${styles.bold}`}>{distance}</td>
          </tr>
        )}
        {duration && (
          <tr className={styles.row}>
            <td className={styles.cell}>Продолжительность</td>
            <td className={`${styles.cell} ${styles.bold}`}>{duration}</td>
          </tr>
        )}
        {heightDifference && (
          <tr className={styles.row}>
            <td className={styles.cell}>Перепад высот</td>
            <td className={`${styles.cell} ${styles.bold}`}>{heightDifference}</td>
          </tr>
        )}
        {routsCount && (
          <tr className={styles.row}>
            <td className={styles.cell}>Маршрутов</td>
            <td className={`${styles.cell} ${styles.bold}`}>{routsCount}</td>
          </tr>
        )}
        {placesCount && (
          <tr className={styles.row}>
            <td className={styles.cell}>Мест</td>
            <td className={`${styles.cell} ${styles.bold}`}>{placesCount}</td>
          </tr>
        )}
        {price && (
          <tr className={styles.row}>
            <td className={styles.cell}>Участие</td>
            <td className={`${styles.cell} ${styles.bold}`}>{price}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

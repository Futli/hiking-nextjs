import Link from 'next/link';
import StatsTable from './stats-table';
import PhotoSvg from '../../public/photo.svg';
import PlaySvg from '../../public/play.svg';
import PanoramaTourSvg from '../../public/panorama-tour.svg'
import styles from './stats-card.module.scss';

export default function StatsCard({
  className,
  markColor, 
  distance,
  duration,
  heightDifference,
  routsCount,
  placesCount,
  price,
  videoUrl,
  photoAlbumUrl,
  tour3D = false,
  image360Url
}) {
  const isStatsTableVisible =
    markColor || distance || duration || heightDifference || routsCount || placesCount || price;

  return (
    <div className={className ? `${className} ${styles.stats}` : styles.stats}>
      {isStatsTableVisible && (
        <StatsTable
          className={styles.table}
          markColor={markColor}
          distance={distance}
          duration={duration}
          heightDifference={heightDifference}
          routsCount={routsCount}
          placesCount={placesCount}
          price={price}
        />
      )}

      {(videoUrl || tour3D || photoAlbumUrl || image360Url) && (
        <div className={styles.actions}>
          {photoAlbumUrl ? (
            <Link href={photoAlbumUrl}>
              <a className={`${styles.button} ${styles.wide} ${styles.dark}`}>
                <PhotoSvg className={`${styles.buttonIcon} ${styles.photo}`} />
                Фотоальбом
              </a>
            </Link>
          ): <p className={`${styles.button}  ${styles.grey}`}>
          <PhotoSvg className={`${styles.buttonIconInactive} ${styles.photo}`} />
          Фотоальбом
        </p>
        }
      {/*     {videoUrl ? (
            <a className={`${styles.button} ${styles.dark}`} href={videoUrl}>
              <PlaySvg className={styles.buttonIcon} />
              Видео
            </a>
          ): <p className={`${styles.button} ${styles.grey}`} >
          <PlaySvg className={styles.buttonIconInactive} />
          Видео
        </p> } */}
          {tour3D ? (
            <Link href={tour3D}>
              <a className={`${styles.button} ${styles.dark}`}>
                <PanoramaTourSvg className={`${styles.buttonIcon} ${styles.panoramaTour}`} />
                3D-тур
              </a>
            </Link>
          ): <p className={`${styles.button} ${styles.grey}`}>
          <PanoramaTourSvg className={`${styles.buttonIconInactive} ${styles.panoramaTour}`} />
          3D-тур
        </p>}
          {image360Url ? (
            <Link href={image360Url}>
              <a className={`${styles.button} ${styles.dark}`}>
                <PanoramaTourSvg className={`${styles.buttonIcon} ${styles.panoramaTour}`} />
                360-панорама
              </a>
            </Link>
          ): <p className={`${styles.button} ${styles.grey}`}>
          <PanoramaTourSvg className={`${styles.buttonIconInactive} ${styles.panoramaTour}`} />
          360-панорама
        </p> }
        </div>
      )}
    </div>
  );
}

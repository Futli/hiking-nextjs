
import { useCallback, useEffect, useRef, useState } from 'react';
import { Layout } from "../../components/layout/layout";
import { CarouselCustom } from "../../components/carousel-custom/carousel-custom";
import { Carousel } from "react-bootstrap";
import { api } from "../../services/hiking-service";

import Link from "next/link";
import Image from "next/image"
import RouteSvg from '../../public/route.svg';
import ShareSvg from '../../public/share.svg';
import styles from './area.module.scss';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

const pageSize = 6;

export default function AreaItem({ area, areas, places, routes }) {  
  const [isDescriptionFolded, setIsDescriptionFolded] = useState(undefined);
  const descriptionRef = useRef(null);
  const [isCopiedTooltipVisible, setIsCopiedTooltipVisible] = useState(false);
  const [areasPageToLoad, setAreasPageToLoad] = useState(2);
  const [otherAreas, setOtherAreas] = useState(areas
    .filter(({ id }) => id !== area.id)
    .map(( areaData ) => ({
      ...areaData,
      text: areaData.title,
    }))
  );
  const [preloadedAreas, setPreloadedAreas] = useState(null);
  const [isShowMoreButtonVisible, setIsShowMoreButtonVisible] = useState(false);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsDescriptionFolded(descriptionRef.current.scrollHeight > 110);
    }

    loadAreas();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isCopiedTooltipVisible) {
      setTimeout(() => setIsCopiedTooltipVisible(false), 1800);
    }
  }, [isCopiedTooltipVisible]);
  const [youTube, setYouTube] = useState(area.youTubeUrl ? area.youTubeUrl.split(/[ ,]+/) : null);
  const loadAreas = useCallback(() => {
    api.getAreas({ page: areasPageToLoad, pageSize })
      .then((result) => {
        console.log(result.data);
        
        setAreasPageToLoad(areasPageToLoad + 1);
        const loadedAreas = result.data.map(( areasData ) => ({
          ...areaData,
          text: areaData.title,
        }));


        setPreloadedAreas(loadedAreas);
        if (loadedAreas.length === 0) {
          setIsShowMoreButtonVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [areasPageToLoad]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopiedTooltipVisible(true);
  }, []);

  const handleLoadAreas = () => {
    setOtherAreas([...otherAreas, ...preloadedAreas]);
    loadAreas();
  };

  return (
    <Layout title="Районы">
      <div className={styles.areaWrapper}>
        <h1 className={styles.title}>{area.title}</h1>

        <div className={styles.buttonGroup}>
          <Link href={`/?type=area&id=${area.id}`}>
            <a className={styles.mapButton}>
              <RouteSvg className={styles.icon} width={25} />
              На карте
            </a>
          </Link>
          <button
            className={styles.shareButton}
            onClick={handleShare}
          >
            <ShareSvg width={25} />
            <span
              className={isCopiedTooltipVisible ? `${styles.shareTooltip} ${styles.visible}` : styles.shareTooltip}
            >
              Ссылка на страницу скопирована
            </span>
          </button>
        </div>

        <Carousel className={styles.mainCarousel} controls={ area.youTubeUrl ? true : false } indicators={false} interval={null}>
          <Carousel.Item className={styles.mainCarouselItem}>
            <Image
              className={styles.mainCarouselImg}
              src={area.imageId ? `${BASE_URL}/images/${area.imageId}.jpg` : "/mock-img.jpg"}
              layout="fill"
              alt="Rout image"
            />
          </Carousel.Item>
          {youTube && youTube.map((val,key) => {
            return ( 
            <Carousel.Item key={key} className={styles.mainCarouselItem}>
              <iframe
                src={val}
                key={key}
                frameBorder="0"
                allowFullScreen
                width="100%"
                height="100%"
                title="video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
             
            </Carousel.Item>
            )
          })}
        </Carousel>

        <div className={styles.infoSection}>
          <div className={styles.mainInfo}>
            {(area.description) && (
              <div
                className={(isDescriptionFolded === false) ? `${styles.description} ${styles.expanded}` : styles.description}
                ref={descriptionRef}
              >
                {area.description && (
                  <p>{area.description}</p>
                )}

                {isDescriptionFolded && (
                  <button
                    className={styles.showAllDescription}
                    type="button"
                    onClick={() => setIsDescriptionFolded(false)}
                  >
                    Показать полностью...
                  </button>
                )}
              </div>
            )}

            <CarouselCustom
              title="Достопримечательности"
              description="Места, которые можно увидеть в районе"
              data={places.data}
              type="places"
            />

            <CarouselCustom
              title="Маршруты"
              description="Тропы, проходящие в этом районе"
              data={routes.data}
              type="routes"
            />
          </div>

         
        </div>
                  
        <div className={styles.otherAreasWrapper}>
          <CarouselCustom
            className={styles.otherAreas}
            title="Другие районы"
            data={otherAreas}
            type="areas"
            wideCards
          />
          {isShowMoreButtonVisible && (
            <button
              className={styles.showMoreButton}
              type="button"
              onClick={handleLoadAreas}
            >
              Показать ещё
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const area = await api.getAreaInfo(params.id);
  const areas = await api.getAreas();
  const places = await api.getPlaces({ areaId: area.id, page: 1, pageSize: 6 });
  const routes = await api.getRoutes({ areaId: area.id, page: 1, pageSize: 6 });
  return {
    props: { area, areas, places, routes },
  };
}

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Layout } from '../../components/layout/layout';
import { CarouselCustom } from '../../components/carousel-custom/carousel-custom';
import { Carousel } from 'react-bootstrap';
import { api } from '../../services/hiking-service';
import StatsCard from '../../components/stats-card/stats-card';
import MobileStats from '../../components/pages/routes/mobile-stats';
import RouteSvg from '../../public/route.svg';
import PlaySvg from '../../public/play.svg';
import ShareSvg from '../../public/share.svg';
import styles from './route.module.scss';

import Image from "next/image";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;
const pageSize = 6;

export default function RouteItem({ route, routes, places }) {  
  const [isDescriptionFolded, setIsDescriptionFolded] = useState(undefined);
  const descriptionRef = useRef(null);
  const [isCopiedTooltipVisible, setIsCopiedTooltipVisible] = useState(false);
  const [routesPageToLoad, setRoutesPageToLoad] = useState(2);
  const [otherRoutes, setOtherRoutes] = useState(routes.data
    .filter(({ id }) => id !== route.id)
    .map(( routeData ) => ({
      ...routeData,
      text: routeData.area.title,
    }))
  );
  const [preloadedRoutes, setPreloadedRoutes] = useState(null);
  const [isShowMoreButtonVisible, setIsShowMoreButtonVisible] = useState(true);
  const [youTube, setYouTube] = useState(route.youTubeUrl ? route.youTubeUrl.split(/[ ,]+/) : null);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    loadGraph();
  }, [])

  const loadGraph = useCallback(() => {
    api.getRouteGraph(route.id)
      .then((result) => {
        setGraphData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsDescriptionFolded(descriptionRef.current.scrollHeight > 110);
    }

    loadRoutes();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isCopiedTooltipVisible) {
      setTimeout(() => setIsCopiedTooltipVisible(false), 1800);
    }
  }, [isCopiedTooltipVisible]);

  const loadRoutes = useCallback(() => {
    api.getRoutes({ page: routesPageToLoad, pageSize })
      .then((result) => {
        
        setRoutesPageToLoad(routesPageToLoad + 1);
        const loadedRoutes = result.data.map(( routeData ) => ({
          ...routeData,
          text: routeData.area.title,
        }));

        setPreloadedRoutes(loadedRoutes);
        if (loadedRoutes.length === 0) {
          setIsShowMoreButtonVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [routesPageToLoad]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopiedTooltipVisible(true);
  }, []);

  const handleLoadRoutes = () => {
    setOtherRoutes([...otherRoutes, ...preloadedRoutes]);
    loadRoutes();
  };

const time = route.length * 0.4


  return (
    <Layout title="Маршруты">
      <div className={styles.areaWrapper}>
        <h1 className={styles.title}>{route.title}</h1>
        <h2 className={styles.subtitle}>{route.area.title}</h2>

        <div className={styles.buttonGroup}>
          <Link href={`/?type=route&id=${route.id}`}>
            <a className={styles.mapButton}>
              <RouteSvg className={styles.icon} width={25} />
              Маршрут
            </a>
          </Link>
         {/*  {route.youTubeUrl && (
            <a className={styles.playButton} href={route.youTubeUrl}><PlaySvg width={25} /></a>
          )} */}
       {/*    <button
            className={styles.shareButton}
            onClick={handleShare}
          >
            <ShareSvg width={25} />
            <span
              className={isCopiedTooltipVisible ? `${styles.shareTooltip} ${styles.visible}` : styles.shareTooltip}
            >
              Ссылка на страницу скопирована
            </span>
          </button> */}
        </div>

        <Carousel className={styles.mainCarousel} controls={ route.youTubeUrl ? true : false } indicators={true} interval={null}>
          <Carousel.Item className={styles.mainCarouselItem}>
            <Image
              className={styles.mainCarouselImg}
              src={
                route.imageId
                  ? `${BASE_URL}/images/${route.imageId}.jpg`
                  : "/no-photo-cover.jpg"
              }
              styles={"d-block w-100"}
              layout="fill"
              alt="Route image"
            />
          </Carousel.Item>
          {youTube && youTube.map((val,key) => {
            return ( <Carousel.Item key={key} className={styles.mainCarouselItem}>
              <iframe
                src={val}
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
            {(route.description || route.shortDescription) && (
              <div
                className={isDescriptionFolded === false ? `${styles.description} ${styles.expanded}` : styles.description}
                ref={descriptionRef}
              >
                {route.description && (
                  <p dangerouslySetInnerHTML={{
                    __html: route.description,
                }}></p>
                )}

                {route.shortDescription && (
                  <p>{route.shortDescription}</p>
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

            <MobileStats
              className={styles.mobileStats}
              length={`${route.length} км`}
              heightDifference={`${route.height} м`}
              duration={`${time} часов`}
            />

           {/*  <Chart className={styles.chart} data={graphData} /> */}

           
          </div>

          <aside className={styles.aside}>
            <StatsCard
              className={styles.stats}
              markColor={`#${route.color}`}
              distance={`${route.length} км`}
              duration={`${time} часов`}
              heightDifference={`${route.height} м`}
              photoAlbumUrl={null}
              videoUrl={route.youTubeUrl}
            />
          
        {/*     <div className={styles.mapWrapper}>
              <div className={styles.map} >
                
              </div>
            </div> */}
          </aside>
        </div>
                  
        <div className={styles.otherRoutesWrapper}> <CarouselCustom
              title="  Достопримечательности"
              description="Места, которые можно увидеть по маршруту"
              data={places.data}
              type="places"
            />
          <CarouselCustom
            className={styles.otherRoutes}
            title="Другие маршуруты"
            data={otherRoutes}
            type="routes"
            wideCards
          />
          {isShowMoreButtonVisible && (
            <button
              className={styles.showMoreButton}
              type="button"
              onClick={handleLoadRoutes}
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
  const route = await api.getRouteInfo(params.id);
  const routes = await api.getRoutes({ page: 1, pageSize: 6 });
  const places = await api.getPlaces({ page: 1, pageSize: 6, areaId: route.areaId})
  return {
    props: { route, routes, places },
  };
}

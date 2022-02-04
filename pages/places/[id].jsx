import { useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout/layout";
import { CarouselCustom } from "../../components/carousel-custom/carousel-custom";
import { ImageCustom } from "../../components/image-custom/image-custom";
import { Carousel, Button } from "react-bootstrap";
import { api } from "../../services/hiking-service";
import Image from "next/image";
import Link from "next/link";

import StatsCard from "../../components/stats-card/stats-card";
import MobileStats from "../../components/pages/places/mobile-stats";

import RouteSvg from "../../public/route.svg";

import ShareSvg from "../../public/share.svg";
import styles from "./place.module.scss";


import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

const pageSize = 6;

export default function PlaceItem({ place, places, routes }) {
  const [isDescriptionFolded, setIsDescriptionFolded] = useState(undefined);
  const descriptionRef = useRef(null);
  const [isCopiedTooltipVisible, setIsCopiedTooltipVisible] = useState(false);
  const [youTube, setYouTube] = useState(place.youTubeUrl ? place.youTubeUrl.split(/[ ,]+/) : null);
  const [placesPageToLoad, setPlacesPageToLoad] = useState(2);
  const [otherPlaces, setOtherPlaces] = useState(
    places.data
      .filter(({ id }) => id !== place.id)
      .map((placeData) => ({
        ...placeData,
        text: placeData.area.title,
      }))
  );
  const [preloadedPlaces, setPreloadedPlaces] = useState(null);
  const [isShowMoreButtonVisible, setIsShowMoreButtonVisible] = useState(true);
  
  useEffect(() => {
    if (descriptionRef.current) {
      setIsDescriptionFolded(descriptionRef.current.scrollHeight > 110);
    }
    loadPlaces();
  }, []); 
  // eslint-disable-line

  useEffect(() => {
    if (isCopiedTooltipVisible) {
      setTimeout(() => setIsCopiedTooltipVisible(false), 1800);
    }
  }, [isCopiedTooltipVisible]);

  const loadPlaces = useCallback(() => {
    api
      .getPlaces({ page: placesPageToLoad, pageSize, areaId: place.areaId })
      .then((result) => {
        console.log(result.data);

        setPlacesPageToLoad(placesPageToLoad + 1);
        const loadedPlaces = result.data.map((placeData) => ({
          ...placeData,
          text: placeData.area.title,
        }));

        setPreloadedPlaces(loadedPlaces);
        if (loadedPlaces.length === 0) {
          setIsShowMoreButtonVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [placesPageToLoad]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopiedTooltipVisible(true);
  }, []);

  const handleLoadPlaces = () => {
    setOtherPlaces([...otherPlaces, ...preloadedPlaces]);
    loadPlaces();
  };
console.log(isDescriptionFolded)
  return (

    <Layout title="Места">
      <div className={styles.areaWrapper}>
        <h1 className={styles.title}>{place.title}</h1>
        <h2 className={styles.subtitle}>{place.area.title}</h2>

        <div className={styles.buttonGroup}>
          <Link href={`/?type=place&id=${place.id}`}>
            <a className={styles.mapButton}>
              <RouteSvg className={styles.icon} width={25} /> На карте
            </a>
          </Link>

          {/*  {place.youTubeUrl && (
            <a className={styles.playButton} href={place.youTubeUrl}><PlaySvg width={25} /></a>
          )} */}
        {/*   <button className={styles.shareButton} onClick={handleShare}>
            <ShareSvg width={25} />
            <span
              className={
                isCopiedTooltipVisible
                  ? `${styles.shareTooltip} ${styles.visible}`
                  : styles.shareTooltip
              }
            >
              Ссылка на страницу скопирована
            </span>
          </button> */}
        </div>

        <Carousel
          className={styles.mainCarousel}
          controls={ place.youTubeUrl ? true : false }
          indicators={true}
          interval={null}
        >
          <Carousel.Item className={styles.mainCarouselItem}>
            <Image
              className={styles.mainCarouselImg}
              src={
                place.imageId
                  ? `${BASE_URL}/images/${place.imageId}.jpg`
                  : "/no-photo-cover.jpg"
              }
              styles={"d-block w-100"}
              layout="fill"
              alt="Rout image"
            />
          </Carousel.Item>
          {youTube && youTube.map((val,key) => {
            return ( <Carousel.Item key={key} className={styles.mainCarouselItem}>
              <iframe
                src={val}
                frameBorder="0"
                key={key}
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
           {(place.youTubeUrl || place.panoramaName || place.image360Id) && <aside className={styles.aside}>
              <StatsCard
                className={styles.stats}
                //TODO панорама и 360 картинку запилить
                videoUrl={place.youTubeUrl}
                tour3D={
                  place.panoramaName ? `/panorama/${place.panoramaName}` : null
                }
                image360Url={
                  place.image360Id
                    ? `/places/${place.id}/panorama/${place.image360Id}`
                    : null
                }
              />
            </aside>}
            {place.description && (
              <div
                className={
                  (isDescriptionFolded === false)
                    ? styles.description
                    : `${styles.description} ${styles.no_expanded}`
                }
                ref={descriptionRef}
              >
                {place.description && (
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                      __html: place.description,
                    }}
                  ></div>
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
              title="Маршруты"
              description="Тропы, в том же районе"
              data={routes.data}
              type="routes"
            />
          </div>
        </div>

        <div className={styles.otherPlacesWrapper}>
          <CarouselCustom
            className={styles.otherPlaces}
            title="Другие места"
            data={otherPlaces}
            type="places"
            wideCards
          />
          {isShowMoreButtonVisible && (
            <button
              className={styles.showMoreButton}
              type="button"
              onClick={handleLoadPlaces}
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
  const place = await api.getPlaceInfo(params.id);
  const places = await api.getPlaces({
    areaId: place.area.id,
    page: 1,
    pageSize: 6,
  });
  const routes = await api.getRoutes({
    areaId: place.area.id,
    page: 1,
    pageSize: 6,
  });

  return {
    props: { place, places, routes },
  };
}

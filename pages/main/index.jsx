import { Layout } from "../../components/layout/layout";
import { BackButton } from "../../components/back-button/back-button";
import { Mobile, NoMobile } from "../../constants/media-query";
import stylesPC from "./main_PC.module.scss";
import Image from "next/image";
// Core modules imports are same as usual
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import EventCard from "../../components/pages/events/event-card"
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/swiper-react.cjs.js";

// Import Swiper styles

import { useState } from "react";

import { CardGroup, Card, Button, Row, Col, CardImg } from "react-bootstrap";

import Link from "next/link";
import moment from "moment";
import "moment/locale/ru";
import { api } from "../../services/hiking-service";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

const Main = ({
  news: serverNews,
  areas: serverAreas,
  routes: serverRoutes,
  events: serverEvents,
  placeTypes,
}) => {
  const [news, setNews] = useState(serverNews.data);
  const [areas, setAreas] = useState(serverAreas);
  const [routes, setRoutes] = useState(serverRoutes);
  const [events, setEvents] = useState(serverEvents.data);

  /*     const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    
    const [fetching, setFetching] = useState(false); */

  /* 
    useEffect(() => {
        async function load(page) {
            const result = await api.getNews({ page, pageSize });
            setNews([...news, ...result.data]);
        }
        if (fetching) {
            setPage(page + 1);
            load(page + 1);
            setFetching(false);
        }
    }, [fetching]); */

  /*     useEffect(() => {
        async function load(page) {
            const result = await api.getAreas({ page, pageSize });
            setAreas([...areas, ...result]);
        }
        if (fetching) {
            setPage(page + 1);
            load(page + 1);
            setFetching(false);
        }
    }, [fetching]); */

  /*     useEffect(() => {
    async function load(page) {
      const result = await api.getRoutes({ page, pageSize });
      setRoutes([...routes, ...result.data]);
    };
    if (fetching) {
      setPage((page + 1));
      load(page + 1);
      setFetching(false);
    }
    }, [fetching]) */

  return (
    <Layout title="Главная">
      <NoMobile>
        <div className={stylesPC.background} />
        <div className={stylesPC.container}>
          <div className={stylesPC.titleContainer}>
            <h2>Красноярский хайкинг</h2>
            <p>
              Сеть промаркированных троп, которые начинаются в пригородной черте
              и идут далеко за город
            </p>
          </div>
        </div>

        <section className={stylesPC.News}>
          <div className={stylesPC.container}>
            <h3 className={stylesPC.h3}>Новости</h3>
            <p className={stylesPC.p}>Жизнь проекта в событиях</p>
            <CardGroup className={stylesPC.cardGroup}>
              <Row xs={1} md={2} xl={3}>
                {news.map((val, key) => {
                  return (
                    <Link href={`/news/${val.id}`} key={key} passHref>
                      <div className={stylesPC.newsCard}>
                        <Card.Img
                          className={stylesPC.newsImage}
                          key={val.id}
                          src={`${BASE_URL}/images/${val.imageId}.jpg`}
                        />
                        <div className={stylesPC.textNewsContainer}>
                          {" "}
                          <h3 className={stylesPC.newsTitle}> {val.title} </h3>
                          <div className={stylesPC.dateView}>
                            <div className={stylesPC.date}>
                              {" "}
                              {moment(val.date).format("DD.MM.YYYY")}{" "}
                            </div>
                            <div className={stylesPC.views}>
                              {" "}
                              {val.countViews}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Row>
            </CardGroup>
            <Link href={`/news`} passHref>
              <div className={stylesPC.link}>Показать еще</div>
            </Link>
          </div>
        </section>

        <section className={stylesPC.Events}>
          <div className={stylesPC.container}>
            <h3 className={stylesPC.h3}>Мероприятия</h3>
            <p className={stylesPC.p}>Расписание предстоящих событий</p>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={24}
              slidesPerView={3}
              navigation
              pagination
              scrollbar
              a11y
            >
              {events.map((val, key) => {
                return (
                  <SwiperSlide key={key}>
                    <EventCard val={val} key={key}/>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Link href={`/events`} passHref>
              <div className={stylesPC.link}>Все мероприятия</div>
            </Link>
          </div>
        </section>

        <section className={stylesPC.Areas}>
          <div className={stylesPC.areasBack}>
            <div className={stylesPC.container}>
              <h3 className={stylesPC.h3}>Районы</h3>
              <p className={stylesPC.p}>Области с тропами</p>
              <div className={stylesPC.areasCardCont}>
                <CardGroup className={stylesPC.cardGroup}>
                  <Row xs={1} md={2} xl={3}>
                    {areas.map((val, key) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <Link href={`/areas/${val.id}`} key={key} passHref>
                          <Card className={stylesPC.areasCard}>
                            <div className={stylesPC.gradient}>
                              <Card.Img
                                className={stylesPC.areasImg}
                                key={val.id}
                                src={`${BASE_URL}/images/${val.imageId}.jpg`}
                              />
                            </div>
                            <Card.ImgOverlay>
                              <p className={stylesPC.areasName}>
                                {" "}
                                {val.title}{" "}
                              </p>
                            </Card.ImgOverlay>
                          </Card>
                        </Link>
                      );
                    })}
                  </Row>
                </CardGroup>
              </div>
              <Link href={`/areas`} passHref>
                <div className={stylesPC.link}>Посмотреть все районы</div>
              </Link>
            </div>
          </div>
        </section>

        <section className={stylesPC.Places}>
          <div className={stylesPC.container}>
            <div className={stylesPC.placeBack}>
              <div className={stylesPC.slideCont}>
                <h3 className={stylesPC.placeTitle}>Открывай новые места</h3>
                <Swiper
                  className={stylesPC.placeSwiper}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  navigation
                  spaceBetween={12}
                  slidesPerView={3.5}
                >
                  {/* TODO добавить картинку (хардкодом) и ссылку
                                    /places?type=1 (метод с апи позже будет) при
                                    нажатии на слайд */}
                  {placeTypes.map((val, key) => {
                    return (
                      <SwiperSlide key={key}>
                        <Link href={`/places?typeId=${val.id}`} passHref>
                          <div className={stylesPC.placeCard}>
                            <img src={`MarkerIcons/${val.id}.png`} alt=""/>
                            <div>{val.title}</div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <Link href={`/places`} passHref>
                  <div className={stylesPC.placesLink}>
                    Посмотреть другие места
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={stylesPC.Rotes}>
          <div className={stylesPC.container}>
            <h3 className={stylesPC.h3}>Маршруты</h3>
            <p className={stylesPC.p}>Исследуйте новые тропы</p>
            <div className={stylesPC.rotesContainer}>
              {/* {routes.data.map((val, key) => {
                                return (
                                    <div
                                        key={key}
                                        className={stylesPC.rotesCard}
                                    >
                                        {val.title}
                                    </div>
                                );
                            })} */}

              {routes.data.map((val, key) => {
                return (
                  val.imageId && (
                    // eslint-disable-next-line react/jsx-key
                    <Link href={`/routes/${val.id}`} key={key} passHref>
                      <Card className={stylesPC.routesCard}>
                        <Card.Img
                          className={stylesPC.routesImg}
                          key={val.id}
                          src={`${BASE_URL}/images/${val.imageId}.jpg`}
                        />
                        <Card.ImgOverlay>
                          <div className={stylesPC.routesTitle}>
                            {val.title}
                          </div>
                        </Card.ImgOverlay>
                      </Card>
                    </Link>
                  )
                );
              })}

              <Link href={`/routes`} passHref>
                <div className={stylesPC.routesLink}>
                  <div>Другие тропы —</div>
                  <div className={stylesPC.linkSVG} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className={stylesPC.About}>
          <div className={stylesPC.container}>
            <div className={stylesPC.aboutBack}>
              <h3>Анатолий Безверхий</h3>
              <p>Автор и руководитель проекта</p>
              <div className={stylesPC.aboutText}>
                В 2013 году именно Анатолий принес в Красноярск (а может и в
                Россию) из далекого Гонконга слово «хайкинг» и сделал его
                популярным. Со временем вокруг него сплотилась команда
                единомышленников и проект «Красноярский хайкинг» обрел свое лицо
                и множество поклонников
              </div>
              <Link href={`/about`} passHref>
                <div className={stylesPC.linkAbout}>Подробнее о проекте —</div>
              </Link>
            </div>
          </div>
        </section>
      </NoMobile>
    </Layout>
  );
};
export default Main;

export async function getStaticProps(context) {
  const news = await api.getNews({ page: 1, pageSize: 6 });
  const areas = await api.getAreas({ page: 1, pageSize: 6 });
  const routes = await api.getRoutes({ page: 1, pageSize: 15 });
  const events = await api.getEvents({ page: 1, pageSize: 6 });
  const placeTypes = await api.getPlaceTypes();
  return {
    props: { news, areas, routes, events, placeTypes },
  };
}

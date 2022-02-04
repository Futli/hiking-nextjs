import { useState, useEffect } from "react";
import Image from "next/image";
import { Layout } from "../../components/layout/layout";
import { CardGroup, Card, Button, Row, Col } from "react-bootstrap";
import { BackButton } from "../../components/back-button/back-button";
import { HeaderPage } from "../../components/header-page/header-page";
import { Spin } from "../../components/spin/spin";
// import { ImageCustom } from "../../components/image-custom/image-custom";

import Link from "next/link";
import styles from "./news.module.scss";
import stylesMob from "./news_mobile.module.scss";
import {useRouter} from 'next/router'
import moment from "moment";
import { api } from "../../services/hiking-service";
import { Mobile, NoMobile } from "../../constants/media-query";
import { ImageCustom } from "../../components/image-custom/image-custom";
const FORMAT = "YYYY-MM-DD";
import findViews from "../../components/page-views/findViews";

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

  
  
  





const News = ({ news: serverNews }) => {
  const [news, setNews] = useState(serverNews.data);

  const [dtStartISO, setDtStart] = useState("");
  const [dtEndISO, setDtEnd] = useState("");

  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const [page, setPage] = useState(1);
  
  const [totalRows, setTotalRows] = useState(serverNews.pager.rows);

  const [fetching, setFetching] = useState(false);

  const router = useRouter()
  
  



  useEffect(() => {
    async function load() {
      setLoading(true);
    
      const result = await api.getNews({ dtStartISO, dtEndISO, page });
      setNews(result.data);
      setTotalRows(result.pager.rows);

      setLoading(false);
    }

    if (dtStartISO != "") {
      load();
    }
  }, [dtStartISO, dtEndISO]);

  useEffect(() => {
    const pageSize = 9;
    async function load(page) {
      const result = await api.getNews({ page, pageSize });
      setNews(news => [...news, ...result.data]);
    }
    if (fetching) {
      setPage(page => page + 1);
      load(page + 1);
      setFetching(false);
    }
  }, [fetching]);

  const NewsHeader = () => {
    const handlePeriod = (dtStart, dtEnd) => {
      setDtStart(dtStart.format(FORMAT));
      setDtEnd(dtEnd.format(FORMAT));
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.newsHeader}>
          <NoMobile>
            <button className={styles.buttonFilter_}>
              <div className={styles.buttonSVG} />
              <div>Фильтр</div>
            </button>
          </NoMobile>

          <Mobile>
            <button className={stylesMob.buttonFilter_}>
              <div className={stylesMob.buttonSVG} />
            </button>
          </Mobile>

          <NoMobile>
            <Button
              className={styles.buttonFilter}
              variant={activeButton === 1 ? "success" : "light"}
              onClick={() => {
                handlePeriod(moment(), moment());
                setActiveButton(1);
              }}
            >
              Вчера
            </Button>
          </NoMobile>

          <Mobile>
            <Button
              className={stylesMob.buttonFilter}
              variant={activeButton === 1 ? "success" : "green"}
              onClick={() => {
                handlePeriod(moment(), moment());
                setActiveButton(1);
              }}
            >
              Вчера
            </Button>
          </Mobile>

          <NoMobile>
            <Button
              className={styles.buttonFilter}
              variant={activeButton === 2 ? "success" : "light"}
              onClick={() => {
                handlePeriod(moment().day(-7), moment());
                setActiveButton(2);
              }}
            >
              За неделю
            </Button>
          </NoMobile>

          <Mobile>
            <Button
              className={stylesMob.buttonFilter}
              variant={activeButton === 2 ? "success" : "light"}
              onClick={() => {
                handlePeriod(moment().day(-7), moment());
                setActiveButton(2);
              }}
            >
              За неделю
            </Button>
          </Mobile>

          <NoMobile>
            <Button
              className={styles.buttonFilter}
              variant={activeButton === 3 ? "success" : "light"}
              onClick={() => {
                handlePeriod(moment().subtract(1, "months"), moment());
                setActiveButton(3);
              }}
            >
              За месяц
            </Button>
          </NoMobile>

          <Mobile>
            <Button
              className={stylesMob.buttonFilter}
              variant={activeButton === 3 ? "success" : "light"}
              onClick={() => {
                handlePeriod(moment().subtract(1, "months"), moment());
                setActiveButton(3);
              }}
            >
              За месяц
            </Button>
          </Mobile>
        </div>
      </div>
    );
  };

  if (!!loading) {
    return (
      <Layout title="Новости">
        <BackButton name="Новости" />
        <Spin />
      </Layout>
    );
  }

  if (Object.keys(news).length < 1) {
    return (
      <Layout title="Новости">
        <NoMobile>
          <div className={styles.container}>
            <div className={styles.newsHeaderEror}>
              <NewsHeader />
            </div>
            <h1>Ничего не найдено</h1>
          </div>
        </NoMobile>

        <Mobile>
          <BackButton name="Новости" />
          <NewsHeader />
          <h1>Ничего не найдено</h1>
        </Mobile>
      </Layout>
    );
  }

  return (
    <Layout title="Новости">
      <NoMobile>
        <div className={styles.backNews} />
        <div className={styles.container}>
          <div className={styles.Title}>
            <HeaderPage title="Новости" />
          </div>

          <NewsHeader />

          <CardGroup className={styles.cardGroup}>
            <Row xs={1} md={2} xl={3}>
              {news.map((val, key) => {
                const views = findViews( `${router.pathname}/details/${val.id}`)
                
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Col key={key} className={styles.col}>
                    <Link href={`/news/${val.id}`} key={key} passHref>
                      <Card className={styles.Card}>
                        <Card.Img
                          className={styles.newsImage}
                          variant="top"
                          key={val.id}
                          src={`${BASE_URL}/images/${val.imageId}.jpg`}
                        />
                        {/*<ImageCustom imageId={val.imageId} styles={styles.newsImage}/> */}
                        <Card.Body className={styles.cardBody}>
                          <Card.Title>{val.title}</Card.Title>
                          <Card.Text className={styles.cardFooter}>
                            <p className={styles.date}>
                              {moment(val.date).format("DD.MM.YYYY")}
                            </p>
                             <p className={styles.views}>{views}</p> 
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </CardGroup>
          {Object.keys(news).length < totalRows && (
            <div className={styles.block}>
              <Button
                variant="light"
                className={styles.loadButton}
                onClick={() => {
                  setFetching(true);
                }}
              >
                Показать ещё
              </Button>
            </div>
          )}
        </div>
      </NoMobile>

      <Mobile>
        <BackButton name="Новости" />
        <div className={stylesMob.container}>
          <NewsHeader />

          <div>
            {news.map((val, key) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Link href={`/news/${val.id}`} key={key} passHref>
                  <div className={stylesMob.card}>
                    <Card.Img
                      className={stylesMob.newsImage}
                      key={val.id}
                      src={`${BASE_URL}/images/${val.imageId}.jpg`}
                    />
                    {/*<ImageCustom imageId={val.imageId} styles={styles.newsImage}/> */}
                    <div className={stylesMob.textNewsContainer}>
                      <h3 className={stylesMob.newsTitle}> {val.title} </h3>
                      <div className={stylesMob.dateView}>
                        <div className={stylesMob.date}>
                          {" "}
                          {moment(val.date).format("DD.MM.YYYY")}{" "}
                        </div>
                       {/*  <div className={stylesMob.views}>
                          
                          {val.countViews}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {Object.keys(news).length < totalRows && (
            <div className={styles.block}>
              <Button
                variant="light"
                className={styles.loadButton}
                onClick={() => {
                  setFetching(true);
                }}
              >
                Показать ещё
              </Button>
            </div>
          )}
        </div>
      </Mobile>
    </Layout>
  );
};

export default News;

export async function getStaticProps(context) {
  const news = await api.getNews();

  return {
    props: { news },
  };
}

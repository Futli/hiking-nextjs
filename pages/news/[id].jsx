import { useRouter  } from "next/dist/client/router";
import { BackButton } from "../../components/back-button/back-button";
import { ImageCustom } from "../../components/image-custom/image-custom";
import { CardGroup, Card, Button, Row, Col } from "react-bootstrap";
import styles from "./newsID.module.scss";
import stylesMob from "./newsID_Mob.module.scss";
import stylesGrid from "./news.module.scss"
import stylesMobId from "./news_mobile.module.scss"
import {useEffect, useState} from "react"
import Link from "next/link";
import { Layout } from "../../components/layout/layout";
import { Mobile, NoMobile } from "../../constants/media-query";
import { api } from "../../services/hiking-service";
import moment from "moment";

import findViews from "../../components/page-views/findViews";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

export default function NewsItem({ news: item, newsItem }) {
    const router = useRouter()
const [news, setNews] = useState(item.data);
const [page, setPage] = useState(1);
const [fetching, setFetching] = useState(false);

const [totalRows, setTotalRows] = useState(item.pager.rows);



useEffect(() => {
    async function load(page) {
        const pageSize = 9;
        const result = await api.getNews({ page, pageSize });
        setNews(news => [...news, ...result.data]);
    }
    if (fetching) {
        setPage(page => page + 1);
        load(page + 1);
        setFetching(false);
    }
}, [fetching]);

    var a = new Date(newsItem.date);

    var date = [
        addLeadZero(a.getDate()),
        addLeadZero(a.getMonth() + 1),
        a.getFullYear(),
    ].join(".");

    function addLeadZero(val) {
        if (+val < 10) return "0" + val;
        return val;
    }
    const views = findViews( `news/details/${newsItem.id}`)
    return (
        <Layout title="Новости">
            <NoMobile>
                <div className={styles.wrapper}>
                    {/* <div className={styles.breadcrumbs}>Главная/</div> */}

                    <h2 className={styles.frameTitle}>{newsItem.title}</h2>
                    <div className={styles.dateArea}>
                        <div>
                            <div className={styles.date}>{date}</div>
                            <div className={styles.views}>{views}</div>
                        </div>
                    </div>
                    <div className={styles.newsCont}>
                        <ImageCustom
                            imageId={newsItem.imageId}
                            styles={styles.image}
                        />

                        <div className={styles.textArea}>
                            <p className={styles.frameDescription}>
                            {newsItem.description && (
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                        __html: newsItem.description,
                    }}
                  ></div>
                )}
                            </p>
                        </div>
                    </div>
                    <h2 className={styles.frameTitle}>Ещё новости</h2>
                    <CardGroup className={stylesGrid.cardGroup}>
                        <Row xs={1} md={2} xl={3}>
                            {news.map((val, key) => {
                                var views = findViews( `news/details/${val.id}`)
                                if( val.id != newsItem.id)                                
                                return (
                                    // eslint-disable-next-line react/jsx-key
                                    <Col key={key} className={stylesGrid.col}>
                                        <Link
                                            href={`/news/${val.id}`}
                                            key={key}
                                            passHref
                                        >
                                            <Card className={stylesGrid.Card}>
                                                <Card.Img
                                                    className={stylesGrid.newsImage}
                                                    variant="top"
                                                    key={val.id}
                                                    src={`${BASE_URL}/images/${val.imageId}.jpg`}
                                                />
                                                {/*<ImageCustom imageId={val.imageId} stylesGrid={stylesGrid.newsImage}/> */}
                                                <Card.Body
                                                    className={stylesGrid.cardBody}
                                                >
                                                    <Card.Title>
                                                        {val.title}
                                                    </Card.Title>
                                                    <Card.Text
                                                        className={
                                                            stylesGrid.cardFooter
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                stylesGrid.date
                                                            }
                                                        >
                                                            {moment(
                                                                val.date
                                                            ).format(
                                                                "DD.MM.YYYY"
                                                            )}
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
                <BackButton name="Вернуться к ленте" href="/news" />

                <div className={stylesMob.wrapper}>
                    <div className={stylesMob.dateArea}>

                        <h2 className={stylesMob.Title}>{newsItem.title}</h2>
                        <div className={styles.cardFooter}>
                            <div className={styles.date}>{date}</div>
                            <div className={styles.views}>{views}</div>
                        </div>

                    </div>
                    <div className={stylesMob.newsCont}>
                        <ImageCustom
                            imageId={newsItem.imageId}
                            styles={stylesMob.image}
                        />

                        <div className={stylesMob.textArea}>
                            <p className={stylesMob.frameDescription}>
                                {newsItem.description}
                            </p>
                            
                        </div>
                        
                    </div>
                    <div>
                    <h3 className={stylesMobId.newsTitle}>Ещё новости</h3>

                        {news.map((val, key) => {
                            if (val.id != newsItem.id)
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <Link
                                    href={`/news/${val.id}`}
                                    key={key}
                                    passHref
                                >
                                    <div className={stylesMobId.card}>
                                        <Card.Img
                                            className={stylesMobId.newsImage}
                                            key={val.id}
                                            src={`${BASE_URL}/images/${val.imageId}.jpg`}
                                        />
                                        {/*<ImageCustom imageId={val.imageId} styles={styles.newsImage}/> */}
                                        <div
                                            className={
                                                stylesMobId.textNewsContainer
                                            }
                                        >
                                            <h3 className={stylesMobId.newsTitle}>
                                                {" "}
                                                {val.title}{" "}
                                            </h3>
                                            <div className={stylesMobId.dateView}>
                                                <div className={stylesMobId.date}>
                                                    {" "}
                                                    {moment(val.date).format(
                                                        "DD.MM.YYYY"
                                                    )}{" "}
                                                </div>
                                                <div
                                                    className={stylesMobId.views}
                                                >
                                                    
                                                    {val.countViews}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Mobile>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const newsItem = await api.getNewsInfo(params.id);
    const news = await api.getNews();


    return {
        props: {  news, newsItem },
    };
}

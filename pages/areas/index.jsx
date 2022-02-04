import { useState, useEffect } from "react";

import { Layout } from "../../components/layout/layout";
import { CardGroup, Card, Row, Col } from "react-bootstrap";
import { BackButton } from "../../components/back-button/back-button";
import { Spin } from "../../components/spin/spin";
import { Mobile, NoMobile } from "../../constants/media-query";
import { HeaderPage } from "../../components/header-page/header-page";

import Link from "next/link";
import styles from "./areas.module.scss";
import stylesMob from "./areas_mobile.module.scss";

import { api } from "../../services/hiking-service";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

const Areas = ({ areas: serverAreas }) => {
  const [areas, setAreas] = useState(serverAreas);

  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const [page, setPage] = useState(1);
  
  const [totalRows, setTotalRows] = useState(25);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
      const pageSize = 20;
        async function load(page) {
      const result = await api.getAreas({ page, pageSize });
      setAreas((areas)=>[...areas, ...result]);
    }
    if (fetching) {
      setPage(page => page + 1);
      load(page + 1);
      setFetching(false);
    }
  }, [fetching]);

  const AreasHeader = () => {
    return (
        <div className={styles.newsHeader}>
{/* 
            <Mobile>
                <button className={stylesMob.buttonFilter_}>
                    <div className={stylesMob.buttonSVG} />
                </button>
            </Mobile>

            <Mobile>
                <Button
                    className={stylesMob.buttonFilter}
                    variant={activeButton === 1 ? "success" : "green"}
                    onClick={() => {
                        setActiveButton(1);
                    }}
                >
                  До 3 км
                </Button>
            </Mobile>

            <Mobile>
                <Button
                    className={stylesMob.buttonFilter}
                    variant={activeButton === 2 ? "success" : "light"}
                    onClick={() => {
                        setActiveButton(2);
                    }}
                >
                    3-5 км
                </Button>
            </Mobile>

            <Mobile>
                <Button
                    className={stylesMob.buttonFilter}
                    variant={activeButton === 3 ? "success" : "light"}
                    onClick={() => {
                        setActiveButton(3);
                    }}
                >
                  {'> 5 км'}
                </Button>
            </Mobile> */}
        </div>
    );
};

  if (!!loading) {
    return (
      <Layout title="Районы">
        <BackButton name="Районы" />
        <Spin />
      </Layout>
    );
  }

  if (Object.keys(areas).length < 1) {
    return (
      <Layout title="Районы">
        <BackButton name="Районы" />
        <AreasHeader />
        <h1>Ничего не найдено</h1>
      </Layout>
    );
  }

  return (
    <Layout title="Районы">
        <NoMobile>
            <div className={styles.backNews} />
            <div className={styles.container}>
                <div className={styles.Title}>
                    <HeaderPage title="Районы" />
                </div>
  
                <AreasHeader />
  
                <CardGroup className={styles.cardGroup}>
                    <Row xs={1} md={2} xl={3}>
                        {areas.map((val, key) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <Col key={key} className={styles.col}>
                                    <Link
                                        href={`/areas/${val.id}`}
                                        key={key}
                                        passHref
                                    >
                                        <Card className={styles.Card}>
                                            <Card.Img
                                                className={styles.newsImage}
                                                variant="top"
                                                key={val.id}
                                                src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : "/no-photo.jpg"}

                                            />
                                            <Card.Body
                                                className={styles.cardBody}
                                            >
                                                <Card.Title>
                                                    {val.title}
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            );
                        })}
                    </Row>
                </CardGroup>
             {/*    {Object.keys(areas).length < totalRows && (
                    <div className={styles.moreButton}>
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
                )} */}
            </div>
        </NoMobile>
  
        <Mobile>
            <BackButton name="Районы" />
            <div className={stylesMob.container}>
                <AreasHeader />
  
                <div>
                    {areas.map((val, key) => {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <Link
                                href={`/areas/${val.id}`}
                                key={key}
                                passHref
                            >
                                <div className={stylesMob.card}>
                                    <Card.Img
                                        className={stylesMob.newsImage}
                                        key={val.id}
                                        src={val.imageId ? `${BASE_URL}/images/${val.imageId}.jpg` : "/no-photo.jpg"}
                                    />
                                    <div
                                        className={
                                            stylesMob.textNewsContainer
                                        }
                                    >
                                        <h3 className={stylesMob.newsTitle}>
                                            {" "}
                                            {val.title}{" "}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
  
               {/*  {Object.keys(areas).length < totalRows && (
                    <div className={styles.moreButton}>
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
                )} */}
            </div>
        </Mobile>
    </Layout>
  );
};

export default Areas;

export async function getStaticProps(context) {
  const areas = await api.getAreas({ page: 1, pageSize: 25});

  return {
    props: { areas },
  };
}

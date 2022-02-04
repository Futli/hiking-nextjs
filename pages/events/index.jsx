import { useState, useEffect } from "react";

import { Layout } from "../../components/layout/layout";
import { CardGroup, Card, Button, Row, Col } from "react-bootstrap";
import { BackButton } from "../../components/back-button/back-button";
import { HeaderPage } from "../../components/header-page/header-page";
import { Spin } from "../../components/spin/spin";
// import { ImageCustom } from "../../components/image-custom/image-custom";

import Link from "next/link";
import styles from "./news.module.scss";
import stylesMob from "./news_mobile.module.scss";
import EventCard from "../../components/pages/events/event-card";


import { api } from "../../services/hiking-service";
import { Mobile, NoMobile } from "../../constants/media-query";
import { ImageCustom } from "../../components/image-custom/image-custom";



const Events = ({ events: serverEvents }) => {
  const [events, setEvents] = useState(serverEvents.data);

  const [dtStartISO, setDtStart] = useState("");
  const [dtEndISO, setDtEnd] = useState("");

  const [loading, setLoading] = useState(false);
  
  const [activeButton, setActiveButton] = useState(null);

  const [page, setPage] = useState(1);
  
  const [totalRows, setTotalRows] = useState(serverEvents.pager.rows);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const result = await api.getEvents({ dtStartISO, dtEndISO, page });
      setEvents(result.data);
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
      const result = await api.getEvents({ page, pageSize }).then(
      setEvents((events)=>[...events, ...result.data]))
    }
    if (fetching) {
      setPage(page => page + 1);
      load(page + 1);
      setFetching(false);
    }
  }, [fetching]);

  const EventsHeader = () => {
    const handlePeriod = (dtStart, dtEnd) => {
      setDtStart(dtStart.format(FORMAT));
      setDtEnd(dtEnd.format(FORMAT));
    };

    return (
      <div className={styles.wrapper}>
      {/*   <div className={styles.newsHeader}>
          <NoMobile>
            <button className={styles.buttonFilter_}>
              <div className={styles.buttonSVG} />
              <div>Выберите даты</div>
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
              Завтра
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
              Завтра
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
              В выходные
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
              В выходные
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
              В этом месяце
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
              В этом месяце
            </Button>
          </Mobile>
        </div> */}
      </div>
    );
  };

  if (!!loading) {
    return (
      <Layout title="Мероприятия">
        <BackButton name="Мероприятия" />
        <Spin />
      </Layout>
    );
  }

  if (Object.keys(events).length < 1) {
    return (
      <Layout title="Мероприятия">
        <NoMobile>
          <div className={styles.container}>
            <div className={styles.newsHeaderEror}>
              <EventsHeader />
            </div>
            <h1>Ничего не найдено</h1>
          </div>
        </NoMobile>

        <Mobile>
          <BackButton name="Мероприятия" />
          <EventsHeader />
          <h1>Ничего не найдено</h1>
        </Mobile>
      </Layout>
    );
  }

  return (
    <Layout title="Мероприятия">
      <NoMobile>
        <div className={styles.backNews} />
        <div className={styles.container}>
          <div className={styles.Title}>
            <HeaderPage title="Мероприятия" />
          </div>

          <EventsHeader />

          <CardGroup className={styles.cardGroup}>
            <Row xs={1} md={2} xl={3}>
              {events.map((val, key) => {
                
                return (
                 <EventCard val={val} key={key}/>
                );
              })}
            </Row>
          </CardGroup>
          {Object.keys(events).length < totalRows && (
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
        <BackButton name="Мероприятия" />
        <div className={stylesMob.container}>
          <EventsHeader />

          
            {events.map((val, key) => {
              return (
                <EventCard val={val} key={key}/>
              );
            })}
          

          {Object.keys(events).length < totalRows && (
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

export default Events;

export async function getStaticProps(context) {
  const events = await api.getEvents({ page: 1, pageSize: 6});

  return {
    props: { events },
  };
}

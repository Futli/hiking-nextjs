import { NaviBarMobile } from "../components/navibar-mobile/navibar-mobile";
import SearchPannel from "../components/search-pannel/search-pannel";
import { Mobile, NoMobile } from "../constants/media-query";
import dynamic from "next/dynamic";

import { HeadCustom } from "../components/head-custom/head-custom";
import { useState, useRef } from "react";
import Link from "next/link";
import { api } from "../services/hiking-service";
import ErrorBoundary from "../components/error/ErrorBoundary"
const Map = dynamic(
  () => {
    return import("../components/leaflet-map/map");
  },
  { ssr: false }
);

/* if (typeof window !== undefined) {
  import("../components/leaflet-map/map") */

export default function Index(props) {
  const [search, setSearch] = useState("");

  const filteredPlaces = props.props.data.preloadPlaces.data.filter((obj) => {
    return obj.title.toLowerCase().includes(search.toLowerCase());
  });
  const filteredAreas = props.props.data.preloadAreas.filter((obj) => {
    return obj.title.toLowerCase().includes(search.toLowerCase());
  });
  const filteredRoutes = props.props.data.preloadRoutes.data.filter((obj) => {
    return obj.title.toLowerCase().includes(search.toLowerCase());
  });

  const ref = useRef(null);

  const onHandleSearch = ({ target: { value } }) => {
    setSearch(value);
    // ref.current.focus();
  };

  const onClickHandler = (e) => {
    setSearch("");
  };

  const searchPannel = (
    <div>

      <input
        type="text"
        value={search}
        placeholder="Поиск мест и маршрутов"
        ref={ref}
        onChange={onHandleSearch}
      />

      {search && (
        <ul>
          {search &&
            filteredPlaces.map((val, key) => {
              return (
                <li key={key} onClick={onClickHandler}>
                  <Link key={key} href={`/?type=place&id=${val.id}`} passHref >
                    <span>
                      {val.title}
                      <br />
                      <small> {val.area.title} - Место </small>
                    </span>
                  </Link>
                </li>
              );
            })}
          {search &&
            filteredRoutes.map((val, key) => {
              return (
                <li key={key}>
                   <Link key={key} href={`/?type=route&id=${val.id}`} passHref>
                   <span>{val.title}
                  <br />
                  <small> - {val.area.title} - Тропа </small></span></Link>
                </li>
              );
            })}
          {search &&
            filteredAreas.map((val, key) => {
              return (
                <li key={key}>
                  <Link key={key} href={`/?type=area&id=${val.id}`} passHref>
                    
                    <span>
                      {val.title}
                      <br />
                      <small> - Район </small>
                    </span>
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );

  

  return (
    <>
      <HeadCustom title="Карта" />
   

      <Mobile>
        <SearchPannel>{searchPannel}</SearchPannel>
        <NaviBarMobile />
      </Mobile>
      <ErrorBoundary>
      <Map data={props.props.data} query={props.props.query} />
      </ErrorBoundary>
      <NoMobile>
        <SearchPannel>{searchPannel}</SearchPannel>
      </NoMobile>
    </>
  );
}

Index.getInitialProps = async ({ query }) => {
  const preloadPlaces = await api.getPlaces({ page: 1, pageSize: 600 });
  const preloadAreas = await api.getAreas({ page: 1, pageSize: 50 });
  const preloadPlaceTypes = await api.getPlaceTypes();
  const preloadEvents = await api.getEvents({ page: 1, pageSize: 6 });
  const preloadRoutes = await api.getRoutes({ page: 1, pageSize: 600 });
  const preloadTracks = await api.getAllRoutesTracks();
  const type = query.type;
  const id = query.id;

  return {
    props: {
      data: {
        preloadPlaces,
        preloadAreas,
        preloadEvents,
        preloadRoutes,
        preloadTracks,
        preloadPlaceTypes,
      },
      query: { type, id },
    },
  };
};

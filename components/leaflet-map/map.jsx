import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


import {
  MapContainer,
  useMapEvents, 
  ZoomControl,  
} from "react-leaflet";

import Link from "next/link";
//import MarkerClusterGroup from 'react-leaflet-markercluster';
//import "react-leaflet-markercluster/dist/styles.min.css";

//import MarkerClusterGroup from "react-leaflet-markercluster";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L, { map } from "leaflet";
import("leaflet")
  .then((L) => {
    return L;
  })
  .catch((err) => console.log({ err }));

import "leaflet/dist/leaflet.css";
import Layers from "./src/components/layers";

import PlaceCard from "./src/components/place-card";
import RouteCard from "./src/components/route-card";

import MarkersDesktop from "./src/components/markers/markersD";
import MarkersMobile from "./src/components/markers/markersM";

import RoutesMobile from "./src/components/routesDrawing/routesM"
import RoutesDesktop from "./src/components/routesDrawing/routesD"

import { api } from "../../services/hiking-service";

//import sideStyles from "./src/components/sidebar/sidebar.module.scss";
import styles from "./map.module.scss";
import { Mobile, NoMobile } from "../../constants/media-query";
import SidebarHeader from "../sidebar-header/sidebar-header";

import "leaflet-easybutton";
import "./src/components/leaflet-ruler";

import SideBar from "./src/components/sidebar/sidebar";
import { useMediaQuery } from "react-responsive";
import Router from "next/router";


import BurgerMenuD from "../burger-menu/burger-menu-desktop";

export default function Map({
  data: {
    preloadPlaces,
    preloadAreas,
    preloadEvents,
    preloadRoutes,
    preloadTracks,
    preloadPlaceTypes,
  },
  query: { type, id },
}) {
  const zoom = 14;
  const [selectedPlaceType, setSelectedPlaceType] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState(preloadPlaces.data);
  const [routes, setRoutes] = useState(preloadRoutes.data);
  const [tracks, setTracks] = useState(preloadTracks);
  const [areas, setAreas] = useState(preloadAreas);
  const [events, setEvents] = useState(preloadEvents.data);
  const [placeTypes, setPlaceTypes] = useState(preloadPlaceTypes);

  const [activePlaceFlag, setActivePlaceFlag] = useState(false);
  const [activeRouteFlag, setActiveRouteFlag] = useState(false);
  const [sidebar, setSidebar] = useState(true);



  const [clasterKey, setClasterKey] = useState(uuidv4);
  
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [map, setMap] = useState(map);
  const [searchFlag, setSearchFlag] = useState(false);

  const [placeInfo, setPlaceInfo] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 55.9552547817212,
    lng: 92.79911041259766,
  });

  const setActivePlace = (val, key) => {
    setActivePlaceFlag(true);
    setActiveRouteFlag(false);
    setPlaceInfo(val);
    setSidebar(true);

    setCurrentLocation({ lat: val.lat, lng: val.lon });
  };

  const closeSidebar = () =>{
    setSidebar(false);      
    console.log(Router.query);
    (Router.query != {}) && Router.push("/");
  }

  const setActiveRoute = (val, key) => {
    setActiveRouteFlag(true);
    setActivePlaceFlag(false);
    setRouteInfo(val);
    setSidebar(true);
  };

  const MapEventListener = () => {
    useMapEvents({
      click() {
        setActiveRouteFlag(false);
        setActivePlaceFlag(false);
        closeSidebar()
      },
    });
    return null;
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
    onClose();
  };

  L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

  useEffect(() => {
    async function findObj() {
      if (type == "place") {
        const obj = await api.getPlaceInfo(id);
        //console.log("Place now", obj);
        setCurrentLocation({ lat: obj.lat, lng: obj.lon });
        setActivePlace(obj, obj.id);
      } else if (type == "area") {
        const obj = await api.getAreaInfo(id);
        //console.log("Place now", obj);
        setCurrentLocation({ lat: obj.lat, lng: obj.lon });
        setSelectedAreaId(obj.id);
      } else if (type == "route") {
        const center = tracks.filter(({ properties }) => properties.id == id);
        map.fitBounds(center[0].geometry.coordinates);

        const obj = await api.getRouteInfo(id);
        setActiveRoute(obj, obj.id);
        //console.log("Route now", obj);
      }
    }
    if (!map) return;
    findObj();
  }, [type, id, map]);

  useEffect(() => {
    if (!map) return;
    map.flyTo(currentLocation, 14, { duration: 3 });
  }, [selectedAreaId]);

  useEffect(() => {
    if (!map) return;

    map.flyTo(currentLocation, map.getZoom(), { duration: 1 });
  }, [currentLocation]);

  useEffect(() => {
    if (selectedAreaId) {
      const resultArea = areas.filter(({ id }) => id == selectedAreaId)[0];

      setCurrentLocation({ lat: resultArea.lat, lng: resultArea.lon });
    }
  }, [selectedAreaId]);

  const BurgerButtonD = () => {
    const onClickBurger = () => {
      onShow();
      setSidebar(false);
    };

    return (
      <button className={styles.burgerButtonD} onClick={onClickBurger}>
        <img alt="menu" src="burger.svg" width="44px" height="44px" />
      </button>
    );
  };

  useEffect(() => {
    selectedPlaceType != null &&
      setSelectedPlaces((places) =>
        places.filter(({ type }) => Number(type) === Number(selectedPlaceType))
      );
    
    return () => {
      setSelectedPlaces(places);
      setClasterKey(uuidv4) //rerender MarkerCluster
    };
  }, [selectedPlaceType]);

  const Content = () => {
    if (activePlaceFlag || activeRouteFlag) {
      return (
        <>
          {activePlaceFlag && placeInfo && (
            <PlaceCard
              placeInfo={placeInfo}
              otherPlaces={places.filter(
                ({ areaId }) => areaId == placeInfo.areaId
              )}
              routes={routes
                .map((route, key) => route)
                .filter(({ areaId }) => areaId == placeInfo.areaId)}
            />
          )}
          {activeRouteFlag && routeInfo && (
            <RouteCard
              routeInfo={routeInfo}
              otherPlaces={places.filter(
                ({ areaId }) => areaId == routeInfo.areaId
              )}
              routes={routes
                .map((route, key) => route)
                .filter(({ areaId }) => areaId == routeInfo.areaId)}
            />
          )}
        </>
      );
    } else {
      return (
        <NoMobile>
          <SidebarHeader
            selectedAreaId={selectedAreaId}
            onPlaceType={(type) => {
              setSelectedPlaceType(type);
            }}
            onSelectedAreaId={(id) => {
              setSelectedAreaId(id);
            }}
            onSearch={(e) => {
              setSearch(e.target.value);
              setSearchFlag(true);
            }}
            placeTypes={placeTypes}
            events={events}
            areas={areas}
          ></SidebarHeader>
        </NoMobile>
      );
    }
  };

  return (
    <div id="map">
      <NoMobile>
        <BurgerButtonD />
        <BurgerMenuD show={show} onClose={onClose} />
        <SideBar showSidebar={showSidebar} sidebar={sidebar}>
          <Content />
        </SideBar>
      </NoMobile>

      <MapContainer
        className={
          sidebar
            ? `${styles.mapContainer} + ${styles.active}`
            : styles.mapContainer
        }
        center={currentLocation}
        preferCanvas={true}
        zoom={zoom}
        zoomControl={false}
        maxZoom={18}
        whenCreated={setMap}
        scrollWheelZoom={true}
        tap={false}
      >
        <NoMobile>
          <MapEventListener />
          
          <MarkerClusterGroup
            key={clasterKey}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={false}
          >
            <MarkersDesktop
              places={selectedPlaceType ? selectedPlaces : places}
              onActivePlace={(val,id) => {setActivePlace(val,id);}}
            />
          </MarkerClusterGroup>
          <RoutesDesktop tracks={tracks} selectedTrack={routeInfo} map={map} onActiveRoute={(val,id) => setActiveRoute(val,id)}/>
        </NoMobile>

        <Mobile>
          <MarkerClusterGroup
            key={clasterKey}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={false}
          >
            <MarkersMobile
              places={selectedPlaceType ? selectedPlaces : places}
              
            />
          </MarkerClusterGroup>
          <RoutesMobile tracks={tracks} selectedTrack={routeInfo} map={map}/>
        </Mobile>
        {/* <LeafletRuler /> */}
        <ZoomControl position="topright" />
        <Layers />
      </MapContainer>
    </div>
  );
}

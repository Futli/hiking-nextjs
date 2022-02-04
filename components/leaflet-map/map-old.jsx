import React, { useEffect, useState} from "react";


import { TooltipModal } from "../tooltip/tooltip";
import {
    MapContainer,
    useMapEvents,
    Marker,
    Popup,
    ZoomControl,
    Polyline,
    Tooltip,
} from "react-leaflet";
import Link from "next/link";
import L, { map } from "leaflet";
import "leaflet/dist/leaflet.css";
import Layers from "./src/components/layers";

import PlaceCard from "./src/components/place-card";
import RouteCard from "./src/components/route-card";

import { api } from "../../services/hiking-service";

import sideStyles from "./src/components/sidebar/sidebar.module.scss";
import styles from "./map.module.scss";
import { Mobile, NoMobile } from "../../constants/media-query";
import SidebarHeader from "../sidebar-header/sidebar-header";


import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-markercluster";

import 'leaflet-easybutton';
import "./src/components/leaflet-ruler";

import SearchPannel from "../search-pannel/search-pannel";
import SideBar from "./src/components/sidebar/sidebar"
import SideBarMobile from "./src/components/sidebar/sidebar-mobile";



import SwiperCore, { FreeMode } from "swiper/swiper-react.cjs.js";

import getConfig from 'next/config';
import { route } from "next/dist/server/router";
import { MarkerCluster } from "leaflet";
import Icons from "./src/components/icons";
import BurgerMenuD from "../burger-menu/burger-menu-desktop";
import { useMediaQuery } from "react-responsive";
const { publicRuntimeConfig } = getConfig();
const { BASE_URL } = publicRuntimeConfig;

/* 
SwiperCore.use([FreeMode]);

function LeafletRuler() {
    const map1 = useMap();

    useEffect(() => {
        if (!map1) return;
        L.control.ruler().addTo(map1);
    }, [map1]);

    return null;
}
 */




export default function Map( { place , currentPlaceId} ) {

    console.log("mapID", place, currentPlaceId)

    const [ search, setSearch ] = useState("")
    const [selectedPlaceType, setSelectedPlaceType] = useState();
    const [selectedAreaId, setSelectedAreaId] = useState();

    const [placeTypes, setPlaceTypes] = useState([]);
    
    
    //console.log('selectArea', selectedAreaId);
    
    const [loading, setLoading] = useState(true);
    const [places, setPlaces] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [map, setMap] = useState(null);
    const [sidebar, setSidebar] = useState(true);
    const [searchFlag, setSearchFlag] = useState(false);
    const [activePlaceFlag, setActivePlaceFlag] = useState(false);
    const [activeRouteFlag, setActiveRouteFlag] = useState(false);
    const [lineWeight, setlineWeight] = useState(8);

    const [placeInfo, setPlaceInfo] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null);
    
    const [show, setShow] = useState(false);
    const onClose = () => setShow(false);
    const onShow = () => setShow(true);
    
    const [currentLocation, setCurrentLocation] = useState({
        lat: 55.9552547817212,
        lng: 92.79911041259766,
    });
    //console.log('currentLocation', currentLocation);

    const [areas, setAreas] = useState([]);
    const [events, setEvents] = useState([]);


    const setActivePlace = (val, key) => {
        setActivePlaceFlag(true);
        setActiveRouteFlag(false);
        setPlaceInfo(val);
        setSidebar(true);
        setCurrentLocation({ lat: val.lat, lng: val.lon })       
    };


 

    const setActiveRoute = (val, key) => {
        setActiveRouteFlag(true);
        setActivePlaceFlag(false);
        setRouteInfo(val);
        setSidebar(true);
        setlineWeight(20)
        
    };

    const MapEventListener = () => {
        useMapEvents({
            click() {
                setActiveRouteFlag(false);
                setActivePlaceFlag(false);
                setSidebar(false);
            },
        });
        return <h1></h1>;
    };
    
    const showSidebar = () => {setSidebar(!sidebar); onClose()}
    
    var myRenderer = L.canvas({ padding: 0.7, tolerance: 1.2 });
    
    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

    const [state, setState] = useState({
        zoom: 12,
        labelIndex: 0,
        distanceMarker1: null,
        geoCoder: null,
        gEditGeoBoxechangedEventFire: true,
        changetm: null,
    });

    const { zoom } = state;


    useEffect(() => {
        console.log("GET id=", currentPlaceId)
        
        console.log("currentPlace=", place)
        
    }, [currentPlaceId])


    useEffect(() => {
        console.log('a', currentLocation,"area", selectedAreaId);
        if ( !map ) return;
        map.flyTo(currentLocation, 12, {duration: 3});
        
    }, [selectedAreaId])

    useEffect(() => {
        console.log('currentLocation', currentLocation);
        if ( !map ) return;
        map.flyTo(currentLocation, map.getZoom(), {duration: 1});
        console.log("fly")
    }, [currentLocation])


    useEffect(() => {
        if (selectedAreaId){
            const resultArea = areas.filter(({ id }) => id == selectedAreaId)[0];
            console.log('reArea', resultArea);
            setCurrentLocation({ lat: resultArea.lat, lng: resultArea.lon })
        }
    }, [selectedAreaId])



  useEffect(() => {
        async function load() {
            const resultPlaces = await api.getPlaces({ page: 1, pageSize: 600 });
            console.log(resultPlaces, "resultPlaces!")
           // const resultRoutes = await api.getAllRoutesTracks();
            // console.log(resultRoutes, "resultRoutes!")
            const areasList = await api.getAreas({ page: 1, pageSize: 50 });
            console.log(areasList, "areasList!")
            const eventsList = await api.getEvents({ page: 1, pageSize: 6 });
            console.log(eventsList, "eventsList!")
            
            setAreas(areasList);
            setEvents(eventsList.data);
            const resultPlaceTypes = await api.getPlaceTypes();
            setPlaceTypes(resultPlaceTypes);
            setPlaces(resultPlaces.data);
            
            //setRoutes(resultRoutes);            
        }

        load();

       setLoading(false);

    }, []); 


        
        useEffect(() => {
        if ( !map  ) return;
        var burgerButton = L.easyButton('<img src="burger.svg" width="44px" height = "44px" >', function(){onShow();
        setSidebar(false);}).setPosition('topright')
        burgerButton.button.style.width = "44px"
        burgerButton.button.style.height = "44px"
        burgerButton.button.style.padding = "0 0 10px 0"
        burgerButton.button.style.top = "30px"
        map.addControl(burgerButton)
}, [map]);

    useEffect(() => {

        (selectedPlaceType != null) && setSelectedPlaces(places.filter(({ type }) => Number(type) === Number(selectedPlaceType) ));
        console.log('selectedPlaces', selectedPlaceType, selectedPlaces);        
        return () => {
            
            setSelectedPlaces(places)
        }
        
    }, [selectedPlaceType]);

    const RoutesDrawing = () => {
        
       //*TODO useMemo need
        
      let polylines = routes.map((route, key)=> {        
          key = route.properties.id

        return(
            // 
            <Polyline
                key={key}
                color={`#${route.properties.color}`}
                positions={route.geometry.coordinates}
                weight={( route.properties === routeInfo ) ? 9 : 5}
                opacity={0.7}
                bubblingMouseEvents={false}
                renderer={myRenderer}                            
                eventHandlers={{
                    click: () => {
                        setActiveRoute(route.properties, key);            
                    },                               
                }}
            >   <Tooltip sticky>                              
                    <TooltipModal
                        title={route.properties.title}
                        img={route.properties.imageId}
                    />
                </Tooltip>
            </Polyline>
        )
    ;})

return polylines
            }



    const MarkersDrawing = ({places}) =>
    {     
        let markers = places.map((val, key) => {                        
                        key = val.id;
                        let position = [val.lat, val.lon];
                        return (                            
                            <Marker
                                key={key}
                                position={position}
                                icon={Icons(val.type)}
                                eventHandlers={{
                                    click: () => {
                                        setActivePlace(val, key);
                                    },
                                }
                            }
                            >
                                <Popup>                                    
                                <Link href={`/places/${val.id}`} key={key} passHref>
                                    <h1 className={styles.title}>
                                        {val.title}
                                    </h1>
                                </Link>                                   
                                </Popup>
                                <Tooltip>
                                    <TooltipModal
                                        title={val.title}
                                        img={val.imageId}
                                    />
                                </Tooltip>
                            </Marker>                          
                        );
                    })
    return(
        <MarkerClusterGroup showCoverageOnHover={false} >
    {markers}
        </MarkerClusterGroup>
    )            
    }

  /*   useEffect(() => {
        console.log("search: ", search)
        const filteredRoutes = routes.filter(route =>
            {
                return (
                    route.properties.title.toLowerCase().includes(search.toLowerCase())
                       )
            } 
            )
        const filteredPlaces = places.filter(place =>
                {                    
                    return (
                        place.title.toLowerCase().includes(search.toLowerCase())
                           )
                } 
                )
                
    },[search]) */

 


    const Content = () => {
       
        if (activePlaceFlag || activeRouteFlag) {
            return (
                <>
                <NoMobile>
                    <div className={sideStyles.searchPannel}>
                    <SearchPannel search={search} setSearch={setSearch}/>
                    </div>
                   </NoMobile>
                {activePlaceFlag && (
                        placeInfo && (
                            <PlaceCard 
                                placeInfo={placeInfo}
                                otherPlaces={places.filter(({ areaId }) => areaId == placeInfo.areaId)} 
                                routes={routes.map((route, key) => route.properties ).filter(({ areaId }) => areaId == placeInfo.areaId)}
                            />
                        )
                    )}
                    {activeRouteFlag && (
                        routeInfo && (
                            <RouteCard 
                                routeInfo={routeInfo} 
                                otherPlaces={places.filter(({ areaId }) => areaId == routeInfo.areaId)}
                                routes={routes.map((route, key) => route.properties ).filter(({ areaId }) => areaId == routeInfo.areaId)}
                             />
                        )
                    )}
                </>
            );
        }
        else if (searchFlag) {
              <div className={sideStyles.searchOutput}>
        {searchFlag && (filteredRoutes.map((v,k) => {

            return (<div key={k}  className={sideStyles.searchItem}> {v.title} </div> ) 

        }))}
    </div>
            
        }
         else {
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
                    
                >
                    <SearchPannel search={search} setSearch={setSearch}/>
                    </SidebarHeader>
                    </NoMobile>

                     
                   
            );
        }
    } 
    return (
        <>
            <NoMobile>
                    <BurgerMenuD show={show} onClose={onClose}/>
                    <SideBar showSidebar={showSidebar} sidebar={sidebar}>
                    <Content />
                </SideBar>
            </NoMobile>
           {/* <Mobile>
                 <SideBarMobile showSidebar={showSidebar} sidebar={sidebar}>
                    <Content /> 
                </SideBarMobile>
            </Mobile> */}

            <MapContainer
                className={
                    sidebar
                        ? `${styles.mapContainer} ${styles.active}`
                        : styles.mapContainer
                }
                center={currentLocation}
                zoom={zoom}
                zoomControl={false}
                maxZoom={18}
                whenCreated={setMap}
                scrollWheelZoom={true}
            >
                <MapEventListener />
                
                {/* <LeafletRuler /> */}
                <ZoomControl position="topright" />
                <Layers />  
                <MarkersDrawing places={selectedPlaceType ? selectedPlaces : places}/>
                {!loading && <RoutesDrawing/>}
                                
            </MapContainer>
        </>
    );
}

export async function getStaticPaths() {
    const places = await api.getPlaces();
    console.log("SSG path", places)
      // обратите внимание на структуру возвращаемого массива
    const paths = places.map((currentPlaceId) => ({
      params: { id: currentPlaceId.id }
    }))
  
    // `fallback: false` означает, что для ошибки 404 используется другой маршрут
    return {
        paths
      
    }
  }
  export async function getStaticProps({ params }) {
    const place = await api.getPlaceInfo(params.id);
  console.log("SSG", place)
    return {
      props: {
        place
      }
    }
  }

import { Polyline, Popup } from "react-leaflet";
import TooltipModal from "../tooltip/tooltip";
import React from "react"
import L from "leaflet";
const RoutesMobile = ({ tracks, selectedTrack}) => {
  //*TODO useMemo need
  var mobileRenderer = L.canvas({ padding: 0.8, tolerance: 1.5 });
 
  return <> {tracks.map((route, key) => {
    key = route.properties.id;
    return (
      <Polyline
        key={key}
        color={`#${route.properties.color}`}
        positions={route.geometry.coordinates}
        weight={route.properties === selectedTrack ? 9 : 5}
        opacity={0.7}
        renderer={mobileRenderer}
      >
        <Popup>
          <TooltipModal
            title={route.properties.title}
            link={`/routes/${route.properties.id}`}
            img={route.properties.imageId}
          />
        </Popup>
      </Polyline>
    )
  })}</>
};
export default RoutesMobile;

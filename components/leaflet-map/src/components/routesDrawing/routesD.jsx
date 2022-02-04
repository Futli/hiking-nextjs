import React from "react"
import { Polyline, Tooltip } from "react-leaflet";
import TooltipModal from "../tooltip/tooltip"
import L from "leaflet";

export default function RoutesDesktop ({ tracks, onActiveRoute, selectedTrack, map }) {
    
    var myRenderer = L.canvas({ padding: 0.8, tolerance: 1.2 });
    return <> {tracks.map((route, key) => {
      key = route.properties.id
      return (
          <Polyline
          key={key}
          color={`#${route.properties.color}`}
          positions={route.geometry.coordinates}
          weight={route.properties === selectedTrack ? 9 : 5}
          opacity={0.7}
          bubblingMouseEvents={false}
          renderer={myRenderer}
          eventHandlers={{
            click: () => {
              onActiveRoute(route.properties, key);
              map.fitBounds(route.geometry.coordinates);
            },
          }}
        >
          <Tooltip sticky>
            <TooltipModal
              link={`/routes/${route.properties.id}`}
              title={route.properties.title}
              img={route.properties.imageId}
            />
          </Tooltip>
        </Polyline>)
    })}</>
  };
  
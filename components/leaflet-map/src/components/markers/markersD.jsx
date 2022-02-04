import { Marker, Tooltip } from "react-leaflet";
import Icons from "../icons";
import React from "react"
import TooltipModal from "../tooltip/tooltip";

export default function MarkersDesktop ({ places, onActivePlace }) {



  return <> {places.map((val, key) => {
    key = val.id;
    let position = [val.lat, val.lon];
    return (
      <Marker
        styles={{ cursor: "pointer" }}
        key={key}
        position={position}
        icon={Icons(val.type)}
        eventHandlers={{
          click: () => {
            onActivePlace(val, key);
          },
        }}
      >
        <Tooltip>
          <TooltipModal
            title={val.title}
            link={`/places/${val.id}`}
            img={val.imageId}
          />
        </Tooltip>
      </Marker>
    );
  })}</>;
};


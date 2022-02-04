import { Marker, Popup } from "react-leaflet";
import Icons from "../icons";
import React from "react"
import TooltipModal from "../tooltip/tooltip"

const MarkersMobile = ({ places  }) => {
  
    return <> { places.map((val, key) => {
      key = val.id;
      let position = [val.lat, val.lon];
      return(          
        <Marker
        styles={{ cursor: "pointer" }}
        key={key}
        position={position}
        icon={Icons(val.type)}
      >
        <Popup>
          <TooltipModal
            title={val.title}
            link={`/places/${val.id}`}
            img={val.imageId}
          />
        </Popup>
      </Marker>         
       
    )})}</>
  };

  export default  MarkersMobile;
  
import L from 'leaflet';

export default function Icons(type) {

        let icon = L.icon({
        iconUrl: `MarkerIcons/${type}.png`,
        iconRetinaUrl:  `MarkerIcons/${type}.png`,
        iconAnchor: [18, 18],
        popupAnchor: [0, 0],
        tooltipAnchor: [0,0],
        iconSize: [36, 36],
      });

        return icon;
}

//TODO: activeIcon


/* L.canvasMarker(L.latLng(51.495, -0.06), {
    radius: 20,
    img: {
        url: 'icon.png',    //image link
        size: [40, 40],     //image size ( default [40, 40] )
        rotate: 10,         //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
    },
}).addTo(map); */
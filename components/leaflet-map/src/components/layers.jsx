import { TileLayer,
  LayersControl,
} from "react-leaflet";
// Import L from leaflet to create LatLng objects:
import L from "leaflet";
// Import Material UI Components for styling:




const Layers = () => {
 
  return (
    <>
      <LayersControl position="topright">
	  <LayersControl.BaseLayer  name="Jawg.Terrain">
          <TileLayer
            attribution='<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors")'
	   
            url="https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=90popDtGGxdr2LYAASkXL7ZKDGBPHt58emWC2Gy8u44J9gHl0wezWSfBELo7Bmmg"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Thunderforest">
          <TileLayer
            attribution=""
            url="https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=887b119fe75744f48b4e26e663293edb"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Satelite">
          <TileLayer
            attribution=""
            url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>        
       
      </LayersControl>
     
    </>
  );
};

export default Layers;


/* 
OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
	 contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


	var coverages = {
		'sky' : {
			'name' : 'SkyLink',
			'type' : 'button',
			'url' : 'https://msk.tele2.ru/maps/_skylink/%z/%x/%y.png',
			'points' : {top : 15, left : 301}
		},
		'tele2' : {
			'name' : 'Теле2',
			'type' : 'list',
			'items' : {
				'2g' : {
					'hidden' : 'hidden',
					'name' : '2G',
					'url' : 'https://tele2.tilessputnik.ru/tiles/%z/%x/%y.png'
					//'url' : 'http://tele2.tilessputnik.ru/tiles/%z/%x/%y.png'
				},
				'3g' : {
					'name' : '3G',
					'url' : 'https://msk.tele2.ru/maps/_3g/%z/%x/%y.png'
					//'url' : 'http://tele2.tilessputnik.ru/tiles3g/%z/%x/%y.png'
				},
				'lte' : {
					'name' : '4G',
					'url' : 'https://msk.tele2.ru/maps/_4g/%z/%x/%y.png'
					//'url' : 'http://tele2.tilessputnik.ru/tiles4g/%z/%x/%y.png'
				},
				'2g_rostov' : {
					'hidden' : 'hidden',
					'name' : '2G',
					'url' : 'https://rostov.tele2.ru/maps/_2g/%z/%x/%y.png'
				},
				'3g_rostov' : {
					'hidden' : 'hidden',
					'name' : '3G Ростов',
					'url' : 'https://rostov.tele2.ru/maps/_3g/%z/%x/%y.png'
				},
				'lte_rostov' : {
					'name' : '4G Ростов',
					'hidden' : 'hidden',
					'url' : 'https://rostov.tele2.ru/maps/_4g/%z/%x/%y.png'
				}
			},
			'points' : {top : 15, left : 301}
		},
		'beeline' : {
			'name' : 'Билайн',
			'type' : 'list',
			'items' : {
				'3g' : {
					'name' : '3G',
					'url' : 'https://geo.minsvyaz.ru/tiles/main_v2/250/99/3/7/0/77/0/40.png'
					//'url' : 'https://geo.minsvyaz.ru/tiles/main_v2/250/99/3/%z/0/%x/0/%y.png'
				},
				'4g' : {
					'name' : '4G',
					'url' : 'https://geo.minsvyaz.ru/tiles/main_v2/250/99/4/7/0/78/0/40.png'
					//'url' : 'https://geo.minsvyaz.ru/tiles/main_v2/250/99/4/%z/0/%x/0/%y.png'
				}
			},
			'points' : {top: 15, left:15}
		},
		'mts' : {
			'name' : 'МТС',
			'type' : 'list',
			'items' : {
				'3g' : {
					'name' : '3G',
					'url' : 'https://tiles.qsupport.mts.ru/g3_New/%z/%x/%y'
					//'url' : 'http://tiles.mts.ru/G3_New/%z/%x/%y'
				},
				'4g' : {
					'name' : '4G',
					'url' : 'https://tiles.qsupport.mts.ru/LTE_New/%z/%x/%y'
					//'url' : 'http://tiles.mts.ru/LTE_New/%z/%x/%y'
				}
			},
			'points' : {top:15,left:113}
		},
		'megafon' : {
			'name' : 'Мегафон',
			'type' : 'list',
			'items' : {
				'3g' : {
					'name' : '3G',
					'url' : 'https://coverage-map.megafon.ru/%z/%x/%y.png?layers=3g'
				},
				'4g' : {
					'name' : '4G',
					'url' : 'https://coverage-map.megafon.ru/%z/%x/%y.png?layers=lte'
				},
				'4g_plus' : {
					'name' : '4G+',
					'url' : 'https://coverage-map.megafon.ru/%z/%x/%y.png?layers=lte_plus'
				}
			},
			'points' : {top:15,left:192}
		}
	}
	
	
	 */
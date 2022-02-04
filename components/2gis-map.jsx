import * as DG from "2gis-maps";


var container = L.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

var map = DG.map("map", {
  center: [56.010605, 92.880287],
  zoom: 17,
  dragging:false,
  scrollWheelZoom: false,
  fullscreenControl: false,
  zoomControl: false,
});

const content = `
  <div
    id="module-1-1-1"
    data-module="firmCallout"
    class="callout _module_firmCallout _emptyTitle _entrance _open _wideButton"
  >
    <address class="callout__address">
      ММАУ "Центр Путешественников"
      <span class="callout__addressComment"> — Карла Маркса,&nbsp;49</span>
    </address>
    <div class="callout__phone">+7 (391) 227‒92‒01</div>
    <div class="callout__workhours">
      <a
        href="http://2gis.ru/krasnoyarsk/firm/985690699631226/center/92.880287,56.010605/zoom/17?utm_medium=widget&amp;utm_campaign=firmsonmap&amp;utm_source=details"
        target="_blank"
        class="link  callout__scheduleToday _scheme_dark"
      >
        Пн - Пт <span class="callout__scheduleTodayTime"> 09:00–18:00</span>,
       Обед <span class="callout__scheduleTodayTime"> 13:00–14:00 </span>
      </a>
     
    </div>
    <div class="callout__photo">
      <a
        href="http://2gis.ru/krasnoyarsk/firm/985690699631226/photos/985690699631226/center/92.880287,56.010605/zoom/17?utm_medium=widget&amp;utm_campaign=firmsonmap&amp;utm_source=photos"
        target="_blank"
        class="link  _scheme_dark callout__photolink"
      >
        39 фотографий
      </a>
    </div>
    <ul class="callout__payment">
      <li class="callout__paymentItem">Наличный расчёт</li>
      <li class="callout__paymentItem">Оплата через банк</li>
      <li class="callout__paymentItem">Перевод с карты</li>
    </ul>
    <footer class="callout__footer">
      <div class="callout__btn _details">
        <a
          target="_blank"
          href="http://2gis.ru/krasnoyarsk/firm/985690699631226/center/92.880287,56.010605/zoom/17?utm_medium=widget&amp;utm_campaign=firmsonmap&amp;utm_source=details"
          class="link  callout__btnIn callout__details _scheme_none"
        >
          Узнать больше
        </a>
      </div>
      <div class="callout__btn _entrance">
        <div class="callout__btnIn callout__entrance">Найти вход</div>
      </div>
      <div class="callout__btn _route">
        <div
          id="module-1-1-1-1"
          data-module="fromTo"
          class="fromTo _context_callout"
        >
          <a
            target="_blank"
            href="http://2gis.ru/krasnoyarsk/center/92.88172245025636,56.010605/zoom/16/routeTab/rsType/bus/from/92.880287,56.010605╎Центр путешественников, молодежный центр?utm_medium=widget&amp;utm_campaign=firmsonmap&amp;utm_source=route"
            class="link  fromTo__btn _from _scheme_none"
          >
            Путь отсюда
          </a>
          <a
            target="_blank"
            href="http://2gis.ru/krasnoyarsk/center/92.88172245025636,56.010605/zoom/16/routeTab/rsType/bus/to/92.880287,56.010605╎Центр путешественников, молодежный центр?utm_medium=widget&amp;utm_campaign=firmsonmap&amp;utm_source=route"
            class="link  fromTo__btn _to _scheme_none"
          >
            сюда
          </a>
        </div>
      </div>
    </footer>
  </div>
`;

const widget = DG.popup({ minWidth: 335, sprawling: true})
  .setLatLng([56.010605, 92.880287])
  .setContent(content).openOn(map);

  DG.marker([56.010605, 92.880287]).addTo(map).bindPopup(widget);

// configs
// https://api.2gis.ru/doc/maps/ru/manual/dg-loading#npm

/* import React from "react"


export default class Iframe extends React.Component({     
    render() {
      return(         
        <div>          
          <iframe frameborder="no" style="border: 1px solid #a3a3a3; box-sizing: border-box;" src={this.props.src} height={this.props.height} width={this.props.width}/>         
        </div>
      )
    }
}){} */


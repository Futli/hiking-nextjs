import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export default class HikingService {
  
    createRequestOptions = (method, skipHttpsValidation) => {
      const isNode = typeof window === "undefined";
      if (isNode) {
        var Agent = require("https").Agent;
        return {
          method,
          mode: "no-cors",
          agent: new Agent({ rejectUnauthorized: !skipHttpsValidation }),
        };
      };
    };

    getResource = async (route, params={}) => {
      const url = new URL(`${API_URL}${route}`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      const res = await fetch(url, this.createRequestOptions('GET', true));
      let resMessage = await res.text();
      if (!res.ok) {
        throw new Error(`Произошла ошибка по адресу: ${route}, статус: ${res.status} [${resMessage}] ${res.url}`)
      }
      return JSON.parse(resMessage);
    };
  
    getNews = async (params={}) => {
      const {
        page = 1, pageSize = 10, 
      } = params;

      const res = await this.getResource(`/news`,
        params,
      );

      return res
    };
  
    getNewsInfo = async (id) => {
      const person = await this.getResource(`/news/${id}`);
      return person;
    };
  
    getAreas = async (params={}) => {
      const res = await this.getResource(`/areas`,
        params,
      );
      return res
    };

    
    getPlaces = async (params={}) => {
      const res = await this.getResource(`/places`,
        params,
      );
      return res
    };

    getRoutes = async (params={}) => {
      const res = await this.getResource(`/routes`,
        params,
      );
      return res
    };

    getAllRoutesTracks = async (params={}) => {
      const res = await this.getResource(`/routes/tracks`,
        params,
      );
      return res
    };

    getEvents = async (params={}) => {
      const res = await this.getResource(`/events`,
        params,
      );
      return res
    };

    getPlaceTypes = async (params={}) => {
      const res = await this.getResource(`/places/getTypes`,
        params,
      );
      return res
    };

    getPlaceInfo = async (id) => {
      const place = await this.getResource(`/places/${id}`);
      return place;
    };
  
    getAreaInfo = async (id) => {
      const person = await this.getResource(`/areas/${id}`);
      return person;
    };

    getRouteInfo = async (id) => {
      const person = await this.getResource(`/routes/${id}`);
      return person;
    };

    getRouteGraph = async (id) => {
      const person = await this.getResource(`/routes/${id}/graph`);
      return person;
    };
    getViewsCount = async () => {
      const url = "https://api-metrika.yandex.ru/stat/v1/data?&ids=31493383&metrics=ym:pv:pageviews&dimensions=ym:pv:URLPath&date1=2015-01-01&accuracy=full&limit=100000&proposed_accuracy=false"
      const res = await fetch(url, this.createRequestOptions('GET', true));
       
      if (!res.ok) {
        throw new Error(`Произошла ошибка по адресу: ${route}, статус: ${res.status} [${res.statusText}] ${res.url}`)
      }
      console.log(res)
      return await res.json();
    }

  }




  

  export const api = new HikingService();
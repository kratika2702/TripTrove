import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

// export const getPlacesData = async (sw,ne)=>{
//     try{
//     const {data :{data}} = await axios.get(URL,{
//       params: {
//         bl_latitude: sw.lat,
//         tr_latitude: ne.lat,
//         bl_longitude: sw.lng,
//         tr_longitude: ne.lng,
       
//       },
//       headers: {
//         'X-RapidAPI-Key': '04459b2aecmsh9ac1fb83b375a8cp1b0fd4jsna2148284dabb',
//         'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//       }
//     });
//     return data;
//     }
//     catch(err){
//    console.log(err);
//     }
// }  

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-key': '04459b2aecmsh9ac1fb83b375a8cp1b0fd4jsna2148284dabb ',
        // another key -> AIzaSyDKAIWbkM0JwPKv5CVcIvM_iYsj5c7XtMs;
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
        params: { lat, lon: lng },
        headers: {
          'x-rapidapi-key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        },
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
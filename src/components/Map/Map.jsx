import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery} from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";



import Rating from "@mui/material/Rating";
import './styles.css';


const Map =  ({setCoordinates,setBounds,coordinates,places,setChildClicked,weatherData})=>{
    const matches = useMediaQuery('(min-width:600px)');
    const defcoordinates = { lat:0, lng:0};
    return(
        <div className="mapContainer">
            <GoogleMapReact bootstrapURLKeys={ { keys: 'AIzaSyBFunsUmQ7N12nT29zMLRFg_srdOdtHSUo'} }
            defaultCenter={defcoordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e)=>{setCoordinates({lat:e.center.lat,lng:e.center.lng});
            setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw,nw:e.marginBounds.nw,se:e.marginBounds.se});
            // console.log(e);
            }}

            onChildClick={(child) => setChildClicked(child)}
            >
              {places && places.length && places.map((place, i) => (
          <div
            className="markerContainer"
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlined color="primary" fontSize="large" />
              : (
                <Paper elevation={3} className="paper">
                  <Typography className="typography" variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className="pointer"
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <div key={i} lat={data?.coordinates.lat} lng={data?.coordinates.lon}>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </div>
        ))}

            </GoogleMapReact>
        </div>
    );
}
export default Map;



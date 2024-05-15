import React, { useEffect, useState } from "react";
import { CssBaseline,Grid } from "@mui/material";
import Header from "./components/Header/Headerr";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";
import { getWeatherData } from "./api";


const App=()=>{
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);
    const [places, setPlaces] = useState([]);
 

    const [coordinates, setCoordinates] = useState({ lat:0, lng:0});

    const [bounds,setBounds] = useState(null);
    

    const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{

            setCoordinates({lat:latitude,lng:longitude});

        })
    },[]);

    useEffect(() => {
        const filtered = places?.filter((place) => Number(place.rating) > (rating || 0 ) );
    
        setFilteredPlaces(filtered);
      }, [rating]);

    useEffect(() => {
        // Check if bounds is not null and has the necessary properties
        if (bounds && bounds.sw && bounds.ne) {
            setIsLoading(true);

            getWeatherData(coordinates.lat,coordinates.lng)
               .then((data)=> setWeatherData(data));

            getPlacesData(type,bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
                    setIsLoading(false);
                    setFilteredPlaces([]);
                    console.log(data);
                });
        }
    }, [type,bounds, coordinates]);


    return(
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}></Header>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4} spacing={3} >
                 <List   isLoading={isLoading}
            childClicked={childClicked}
            // places={filteredPlaces.length ? filteredPlaces : places}
            places={filteredPlaces?.length ? filteredPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
                 />
                </Grid>

                <Grid item xs={12} md={8} >
                    <Map setChildClicked={setChildClicked}
                       setBounds={setBounds}
                       setCoordinates={setCoordinates}
                       coordinates={coordinates}
                    //    places={filteredPlaces.length ? filteredPlaces : places}
                    places={filteredPlaces?.length ? filteredPlaces : places}
                    weatherData={weatherData}
                    />
                </Grid>
            </Grid>

        </>
    );
}
export default App;
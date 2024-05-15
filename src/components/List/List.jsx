import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import React, {useState,useEffect, createRef} from "react";
import './styles.css';
import PlaceDetails from "../PlaceDetails/PlaceDetails";



const List =  ({places, type, setType, rating, setRating, childClicked, isLoading})=>{
   
    
    const [elRefs, setElRefs] = useState([]);

  
    useEffect(() => {
        if (places) {
          setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
        }
      }, [places]);

    return(
        <div className="container">
            <Typography variant="h4"> Restaurants, Hotels & Attractions around you</Typography> 
             {isLoading? (
              <div className="loading">
          <CircularProgress size="5rem" />
        </div>
             ):(
             <>
            <br/>

            <FormControl className="formControl" >
               <InputLabel>Type</InputLabel>
               <br/>
               <Select value={type} onChange={(e)=>setType(e.target.value)}>
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
               </Select> 
            </FormControl>

            <FormControl className="formControl" >
               <InputLabel>Rating</InputLabel>
               <br/>
               <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
               </Select> 
            </FormControl>

            <br/><br/>

           <div className="listGrid">
           <Grid container spacing={3} className="list">
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
              </Grid>
            ))}
            </Grid>
           </div>
            </>
            )}
        </div>
    );
}
export default List;
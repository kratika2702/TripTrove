import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar,Toolbar,Typography,InputBase,Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import './styles.css';

const Header =  ({setCoordinates})=>{
  const [autocomplete, setAutocomplete] = useState(null);
  const onLoad = (autoC)=> setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

    return(

        <AppBar position="static">
            <Toolbar className="toolbar">
                <Typography variant="h5" className="title">
                  Wander Mate
                </Typography>
                
                <Box display="flex " className="Box">
                <Typography variant="h6" className="subTitle">
                  Explore the world!

                  </Typography>
                  
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className="search">
                        <div className="searchIcon">
                            <SearchIcon/>
                        </div>
                        <div><InputBase placeholder="          Search..." className={`'inputRoot' 'inputInput' ` }/></div>
                    </div>
                  </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Header;
import React, {  useState, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { StateContext } from './GeoTweetScreen';
import {MapStyle} from './MapStyle';
import Marker from './Marker'

  
export const GeoTweetMap = () => {
const {state, dispatch} = useContext(StateContext);


const [data] = useState({ 
    stores: [{lat: 39.04894045, lng: -94.4830034, hashtag:"chiefs", defaultLoc:true},
            {lat: 39.09716052, lng: -94.58001003, hashtag:"kansascity",defaultLoc:false},
            {lat: 39.03091926, lng: -94.5929718, hashtag:"kcmo",defaultLoc:false}
            ]});
    
const [defaultcoords] = useState({
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12
  });

const mapRef=React.useRef();

 const handleApiLoaded = (map, maps) => {
  // use map and maps objects
        map.setOptions(MapStyle);
        mapRef.current = map;
        //console.log("markerRef length: " +markerRef.current.length)
     
    //for data flow purposes, I've debated moving this to a separate function to be called from the parent component once it's state updates that this is loaded. I went this route thinking it'd be more efficient, I was also already using the context to pass onclick events from the markers constructed below. 
    data.stores
    .forEach((store,index) => {
            if(store.defaultLoc){
                map.panTo({
                  lat: store.lat,
                  lng: store.lng
                });
                document.getElementById(index).hidden = true;
                document.getElementById(index +"two").hidden = false;
                
                dispatch({ type: 'UPDATE_LOCATION', data: {
                   lat: store.lat,
                   lng: store.lng,
                    hashtag:store.hashtag
              },})
    }})
        
};

    return (
    
       <GoogleMapReact
          bootstrapURLKeys={{key: process.env.REACT_APP_GMAP_API}}
          defaultCenter={defaultcoords.center}
          defaultZoom={defaultcoords.zoom}
          yesIWantToUseGoogleMapApiInternals = {true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        > 
        { data.stores.map((store,index) => ( 
        //console.log(store.defaultLoc)
                
        <Marker
          parentID={"parentid" +index}
          id={index}
          id2={index + "two"}
          lat={store.lat}
          lng={store.lng}
          text={"#" +store.hashtag}
          onClick={() => {
            //this is the real reason I'm using context for two way data flow. This dispatch is passed to the parent component reducer, then sent to the list component to update the twitter feed. 
            dispatch({ type: 'UPDATE_LOCATION', data: {
                   lat: store.lat,
                   lng: store.lng,
                    hashtag:store.hashtag
              },})
            
              mapRef.current.panTo({
                lat: store.lat,
                lng: store.lng
            })
            //fancy markers woo
            data.stores.forEach((store,dex) => {
                 if(index !== dex){
                    document.getElementById(dex).hidden = false;
                    document.getElementById(dex +"two").hidden = true;
                 }else{
                     document.getElementById(dex).hidden = true;
                    document.getElementById(dex +"two").hidden = false;
                 }
             })
          }  
    }
          />       
    )
                            )}
        </GoogleMapReact>
    );
  
}

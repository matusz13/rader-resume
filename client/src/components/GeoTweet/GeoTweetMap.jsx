import React, {  useState, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import { StateContext } from './GeoTweetScreen';

import Marker from './Marker'

  
export const GeoTweetMap = () => {
const {state, dispatch} = useContext(StateContext);


const [data, setData] = useState({ 
    stores: [{lat: 39.04894045, lng: -94.4830034, hashtag:"chiefs", defaultLoc:true},
            {lat: 39.09716052, lng: -94.58001003, hashtag:"kansascity",defaultLoc:false},
            {lat: 39.03091926, lng: -94.5929718, hashtag:"kcmo",defaultLoc:false}
            ]});
    
const [defaultcoords, setCooords] = useState({
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12
  });

const mapRef=React.useRef();

 const handleApiLoaded = (map, maps) => {
  // use map and maps objects
        map.setOptions({clickableIcons: false,
                        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });
        mapRef.current = map;
        //console.log("markerRef length: " +markerRef.current.length)
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
          bootstrapURLKeys={{key: process.env.GMAP_API/* YOUR KEY HERE */ }}
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
           
              dispatch({ type: 'UPDATE_LOCATION', data: {
                   lat: store.lat,
                   lng: store.lng,
                    hashtag:store.hashtag
              },})
            
              mapRef.current.panTo({
                lat: store.lat,
                lng: store.lng
            })
            
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

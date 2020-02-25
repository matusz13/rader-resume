import React, {   useReducer, useRef }  from 'react';
import {GeoTweetMap} from './GeoTweetMap';
import {GeoTweetList} from './GeoTweetList';
import update from 'immutability-helper';


export const StateContext = React.createContext();
let ref = null;

let initialState = {
    lat: '',
    lng: '',
    hashtag: '',
    weight: ''
  }

function stateReducer(state, action) {
        //reduce actions sent from the child components sharing state context
        switch (action.type) {
            case 'UPDATE_LOCATION':{
                ref.current.updateHookBack(action.data.hashtag,action.data.lat,action.data.lng);
                return update(state, { lat: {$set: action.data.lat},lng: {$set: action.data.lng},hashtag: {$set: action.data.hashtag}, weight: {$set: action.data.hashtag}})
            } 
             case 'UPDATE_LIST':{                
                return update(state, { lat: {$set: action.data.lat},lng: {$set: action.data.lng}, weight: {$set: action.data.weight}})
            }
            default:{
                return initialState;
            }
                
        }
    }

export const GeoTweetScreen = () => {
 ref = useRef(null);
 const [state, dispatch] = useReducer(stateReducer, initialState);
    
    return (
        <React.StrictMode>
        <StateContext.Provider value={{ state, dispatch }}>
        <div style={{height: '100vh'}}>
         <div style={{position: 'absolute', left: '38%', top: 0, width: '62%', height: '100vh'}}>
            <GeoTweetMap />
        </div>
            <div style={{position: 'absolute', left: '0', top: 0, width: '38%', height: '100vh'}}>
            <GeoTweetList ref={ref} />
        </div>
            
    </div>
  </StateContext.Provider>
        </React.StrictMode>
          
    );
  
}


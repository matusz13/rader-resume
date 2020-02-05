import React, { Component, useState, useEffect, useRef, useContext , useReducer,forwardRef, useImperativeHandle} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import axios from 'axios';
import useDebounce from '../utils/useDebounce';
import { StateContext } from './GeoTweetScreen';

import update from 'immutability-helper';


 const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  filledbg: {
    width: '100%',
    height:'100%',
    backgroundColor: '#e8e8e8',
  },
  inline: {
    display: 'inline',
  },
  hashtaginp: {
    textAlign:'center',
    width: '100%',
    
  },
screenname: {
    position:'absolute',
    top:'-10px',
    width: '100%',
    
  },
divider: {
    position:'absolute',
    left:'-71px',
    width: '100%',
    
  },

}));



export const GeoTweetList = forwardRef((props, ref) => {
    const {state, dispatch} = useContext(StateContext);
    
    const [data, setData] = useState({ tweets: [] });
    const classes = useStyles(); 

  
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

     const handleChange = prop => event => {
         dispatch({ type: 'UPDATE_LIST', data: {
                   weight: event.target.value,
                   
              },})
        setSearchTerm(event.target.value);
      };
    
    
    function callGeoTweetService(searchterm){
            if (debouncedSearchTerm) {
        setIsSearching(true);
        const config = {
        method: 'POST',
        url: '/api/geotweet',
        timeout: 1000 * 5,
        headers: {'Content-Type':'application/json',
                 'Accept':'application/json'
                 },
        data: JSON.stringify({hashtag:searchterm,lng:state.lng,lat:state.lat})
        }
        axios(config)
    .then(response => {
            // handle result
            const body =  response.data;
            //console.log("response body: " +body)
            if(body.error == 'invalid URL'){
                setData({
                    error:'invalid url, please try again'});
            }
            else if(body.error == 'Address not found'){
                setData({
                    error:'Could not verify url, please try again'});
             }
            else {
                let tweets = [];
                for (let tweet in body){
                    //console.log("tweet: " + body[tweet].text);
                    tweets.push({
                        text: body[tweet].text,
                        entities: body[tweet].entities,
                        user: body[tweet].user,
                        avatarUrl: "https://twitter.com/"+body[tweet].user.screen_name+"/profile_image?size=mini"})
                }
                //console.log("setting tweet data");
                setData({tweets:tweets});
            }
        })
        .catch((e) => {
            // handle errors and timeout error
            setData({
                    error:'there was an error, please try again'
                });
        })
      }
    }
     
    const updateHookBack = (hashtag, lat, lng) => {
        dispatch({ type: 'UPDATE_LIST', data: {
            lat: lat,
            lng: lng,
                   weight: hashtag
                   
              },})
        
        setSearchTerm(hashtag);
        //callGeoTweetService(hashtag);
    }
    useImperativeHandle(ref,() =>{
        return {
            updateHookBack:updateHookBack
        };
    });
    
     useEffect( () => {
    callGeoTweetService(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
    

    return (
        <div className={classes.filledbg}>
            <div ><div className={classes.hashtaginp}><form className={classes.root} noValidate autoComplete="off">
                <FormControl className={clsx( classes.hashtaginp)} variant="filled">
                  <FilledInput
                    id="filled-adornment-weight"
                    value={state.weight}
                    onChange={handleChange('weight')}
                    
                    startAdornment={<InputAdornment position="start">#</InputAdornment>}
                    aria-describedby="filled-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                  />
                </FormControl>

                </form></div></div>
            <div >
    <Paper style={{maxHeight: '92vh', overflow: 'auto'}}>

       <List className={classes.root}>
          {data.tweets.map(tweet =><div>
      <ListItem  alignItems="flex-start">
        <ListItemAvatar>
        
          <Avatar alt={tweet.user.screen_name}  src={tweet.user.profile_image_url} />
        </ListItemAvatar>
          <ListItemText primary={<React.Fragment><Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
               
              </Typography>
               <div className={classes.screenname}><br/>{"@"+tweet.user.screen_name} </div>
            </React.Fragment>}
              secondary={<React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
               
              </Typography>
              <div ><br/> {tweet.text} </div>
            </React.Fragment>}
              />
        
     
      </ListItem>
    <Divider className={classes.divider} variant="inset" component="li" /></div>)}
      
        </List></Paper></div></div>
    );
  
})


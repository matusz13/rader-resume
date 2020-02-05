import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from '../App';
import Shortener from '../Shortener';
import GeoTweetComponent from '../components/GeoTweet/GeoTweetComponent';
import GeoTweet from '../GeoTweet';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
   
    <Route path="/shortener" component={Shortener} />
    <Route path="/geotweet" component={GeoTweet} />
  </Route>
);
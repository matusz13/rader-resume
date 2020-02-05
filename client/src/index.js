import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Shortener from './components/Shortener';
import GeoTweet from './components/GeoTweet';
import {GeoTweetScreen} from './components/GeoTweet/GeoTweetScreen';
import CatchAll from './components/CatchAll'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <BrowserRouter>
         <Switch>
              <Route exact path='/' component={App} />
              <Route path='/shortener' component={Shortener} />
                <Route path='/geotweet' component={GeoTweet} />
                <Route path='/geotweets' component={GeoTweetScreen} />
              <Route path="/*" component={CatchAll}/>
          </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

import React from 'react';
import GeoTweetScreen from './GeoTweetScreen.js';
import axios from 'axios';

class GeoTweet extends React.Component {
    

 constructor(props) {
    super(props);
    this.state = {
    value: '',
    matches: window.matchMedia("(min-width: 900px)").matches,
    isLoading:false,
    returnedTweets:'',
    error:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
  }

 
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
   }
  
  handleSubmit(e){
    e.preventDefault();      
    this.callapi_getGeoTweet()  
  }

componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 900px)").addListener(handler);
  }
    

    
callapi_getGeoTweet = async () => {
   
    let curURL = this.state.input;
    const config = {
        method: 'POST',
        url: '/api/geotweet',
        timeout: 1000 * 5,
        headers: {'Content-Type':'application/json',
                 'Accept':'application/json',
                 
                 },
        data: JSON.stringify({url:curURL})
    }
   
    axios(config)
    .then(response => {
            // handle result
            const body =  response.data;
            console.log("response body: " +body)
            if(body.error == 'invalid URL'){
                this.setState({
                    error:'invalid url, please try again'
                });
            }
            else if(body.error == 'Address not found'){
                this.setState({
                    error:'Could not verify url, please try again'
                });
             }
            else {
                let tweets = [];
                for (let tweet in body){
                    console.log("tweet: " + body[tweet].text);
                    tweets.push({
                        text: body[tweet].text,
                        entities: body[tweet].entities,
                        user: body[tweet].user
                      
                    })
                }
                this.setState({
                    returnedTweets: tweets
                });
            }
              
            
            
        })
        .catch((e) => {
            // handle errors and timeout error
            console.log('error callBackendAPI ' +e.message);
            this.setState({
                    error:'there was an error, please try again'
                });
           
        })
  }


render() {
    return (
    this.state.isLoading ? <LoadingScreen/> 
        : <GeoTweetScreen onSubmit = {this.handleSubmit} onChange = {this.handleChange} returnedTweets={this.state.returnedTweets} error={this.state.error} input={this.state.input}/>
    )
}
        
        }
        
function LoadingScreen(){
        console.log('return loading screen');
        return(
        <div className="LoadingScreen"><h3>loading</h3>
        </div>
   )
}

        
export default GeoTweet;




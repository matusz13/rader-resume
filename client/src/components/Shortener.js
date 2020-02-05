import React from 'react';
import ShortenerScreen from './ShortenerScreen.js';
import axios from 'axios';

class Shortener extends React.Component {
    

 constructor(props) {
    super(props);
    this.state = {
    value: 'url here',
    matches: window.matchMedia("(min-width: 900px)").matches,
    isLoading:false,
    returnedurl:'',
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
    
    console.log("HANDLE SUBMIT xx" + this.state.input);
      
    this.callapi_NewShort()
     
  }

componentDidMount() {
    console.log('component mount');
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 900px)").addListener(handler);
  }
    

    
callapi_NewShort = async () => {
   
    let curURL = this.state.input;

    const config = {
        method: 'POST',
        url: '/api/newShortenURL',
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
            if(body.error === 'invalid URL'){
                this.setState({
                    error:'invalid url, please try again'
                });
            }
            else if(body.error === 'Address not found'){
                this.setState({
                    error:'Could not verify url, please try again'
                });
             }
            else if(body.short_id){
                this.setState({
                    returnedurl:window.location.protocol + '//' + window.location.host  + '/'+ body.short_id
                });
            }else{
                this.setState({
                    error:'Something went wrong, please try again'
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
        : <ShortenerScreen onSubmit = {this.handleSubmit} onChange = {this.handleChange} returnedurl={this.state.returnedurl} error={this.state.error} input={this.state.input}/>
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

        
export default Shortener;




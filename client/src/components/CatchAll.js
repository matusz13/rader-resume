import React from 'react';
import axios from 'axios';

class CatchAll extends React.Component {
    

 constructor(props) {
    super(props);
    this.state = {
    url: this.props.location,
    matches: window.matchMedia("(min-width: 900px)").matches,
    isLoading:false
    };

    this.handleChange = this.handleChange.bind(this);
 }
 
handleChange(event) {
    //this.setState({
    //  input: event.target.value
    //});
   }

componentDidMount() {
    console.log('component mount');
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 900px)").addListener(handler);
    
    this.callapi_FindShort();
  }
    
renderRedirect = (url) => {
    window.location.replace(url)
    
  }
    
callapi_FindShort = async () => {
    const config = {
        method: 'POST',
        url: '/api/short_id',
        timeout: 1000 * 5,
        headers: {'Content-Type':'application/json',
                 'Accept':'application/json',
                 },
        data: JSON.stringify({url:this.state.url})
    }
    
    axios(config)
    .then(response => {
        const body =  response.data;

        if (response.status !== 200) {
          console.log('error findShortAPI ');
          throw Error(body.message) 
        }
        console.log('body ' + body.url);
        this.renderRedirect(body.url);
  }); //todo: some error handling and a 404 page
          }

render() {
    return (
    this.state.isLoading ? <LoadingScreen/> 
        : <div>redirecting...</div>
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

        
export default CatchAll;




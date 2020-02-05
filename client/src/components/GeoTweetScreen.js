import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody'


class GeoTweetScreen extends Component {
    constructor(props) {
    super(props);
    
    this.state = { value: '', returnedTweets:[], showModal:false, successMessage:''};
    console.log("state setc ");
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
    
  handleChange(event) {
    console.log("handle change " +event.target.value);
    this.setState({value: event.target.value});
  }
  handleShow(event) {
    console.log("handle show ");
    this.setState({showModal: true});
  }
  handleClose(event) {
    console.log("handle close " );
    this.setState({showModal: false});
  }
  
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    var showMOdal = true;
    var erOr: '';
    var returned_url = '';
    document.getElementById("invError").style.visibility = "hidden";
    if(oldProps.error !== newProps.error){
        console.log('show error ' + this.props.error);
        
        //two different error handling methods. in-form and modal pop
        if(this.props.error == "invalid url, please try again"){
            document.getElementById("invError").style.visibility = "visible";

        }else{
            this.setState({ showModal:showMOdal, error:this.props.error, returnedTweets:[], successMessage:''});
        }
      
    }
    else if(oldProps.returnedTweets !== newProps.returnedTweets) {
        console.log('setting new url props');
        this.setState({ showModal:showMOdal,returnedTweets:this.props.returnedTweets, error:'', successMessage:'You can now use this short url: '});
    }
      
}
 
  render() {
    const pgTitle = "GeoTweet";
    
    return (
        
        <div className="App-bg">
        <div className="App">
        <div className="App-header-ss">
        
        <div id="hex1" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex2" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex3" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex4" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex5" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex6" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex7" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        
        <div className="urlForm">
        <div className="screentitle shortenertitle"><h5>{pgTitle}</h5></div>
        <Form className="urlForm" onSubmit={this.props.onSubmit} onChange={this.props.onChange}>
          
        <Form.Row>
            <Col>
              <Form.Control placeholder="url" value={this.state.value} onChange={this.handleChange} />
            </Col>
            <Col>
              <Button variant="outline-secondary" type="submit">
            Submit
        </Button>
            </Col>
          </Form.Row>
        <label id="invError" className="invalidError">* invalid url</label>
        </Form>
      
      
        <Modal className="Modal" show={this.state.showModal} onHide={this.handleClose}>
        <div className="modal-background-color">
   
        <Modal.Header closeButton className="modal-noline"><Modal.Body className="modal-noline"><div className="shortenertitle"></div>
        <label id="successLabel">{this.state.successMessage}</label>
        {this.state.error}</Modal.Body></Modal.Header>
         </div>
      </Modal>
        
        
                { this.state.returnedTweets.map(tweet =>
                <div className="blue-highlight name"><h2>{tweet.text}</h2></div>)}
    
        <div id="hex8" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex9" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex10" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex11" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex12" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex13" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex14" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
       </div>

     </div></div></div>   
    );
  }
}

export default GeoTweetScreen;
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Hexagons from './Hexagons'


class ShortenerScreen extends Component {
    constructor(props) {
    super(props);
    this.state = { value: '', returnedurl:'', showModal:false, successMessage:''};
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
    this.setState({showModal: false});
  }
  
  componentDidUpdate(oldProps) {
    const newProps = this.props;
    var showMOdal = true;
    document.getElementById("invError").style.visibility = "hidden";
    if(oldProps.error !== newProps.error){
        
        //two different error handling methods. in-form and modal pop
        if(this.props.error === "invalid url, please try again"){
            document.getElementById("invError").style.visibility = "visible";

        }else{
            this.setState({ showModal:showMOdal, error:this.props.error, returnedurl:'', successMessage:''});
        }
      
    }
    else if(oldProps.returnedurl !== newProps.returnedurl) {
        this.setState({ showModal:showMOdal,returnedurl:this.props.returnedurl, error:'', successMessage:'You can now use this short url: '});
    }
      
}
 
  render() {
    const pgTitle = "url shortener";

    return (
        
        <div className="App-bg">
        <div className="App">
        <div className="App-header-ss">
        
        <Hexagons/>
        
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
        <a href={this.state.returnedurl}>{this.state.returnedurl}{this.state.error}</a></Modal.Body></Modal.Header>
        
         </div>
      </Modal>
        
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

export default ShortenerScreen;
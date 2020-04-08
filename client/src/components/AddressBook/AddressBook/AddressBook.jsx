import React from "react";
import SearchContacts from "./SearchContacts";
import ContactDetails from "./ContactDetails";
import Hexagons from "../../Hexagons"

class AddressBook extends React.Component {

  render () {
    return (
      <div className="App-bg">
      <div className="App-AddressBk">
      <div className="App-header-ss">
      
      <Hexagons/>
      
      <div className="urlForm">
      <div className="screentitle shortenertitle"><h5>Address Book</h5></div>
      <React.Fragment>
       
        <SearchContacts />
        <ContactDetails />
      </React.Fragment>
      </div></div></div></div>
    );
  }
}

export default AddressBook;
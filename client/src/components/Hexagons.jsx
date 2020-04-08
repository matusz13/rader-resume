import React from "react";


class Hexagons extends React.Component {

  render () {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
  }
}

export default Hexagons;
import React, {  useState, useEffect } from 'react';
import pin from './img/pin.png';
import pin_selected from './img/pin_current.png';
import  './marker.css';

const Marker = ({ parentID,id,id2,text,onClick }) => {
const [txtleft, setLeft] = useState('');

useEffect( () => {
    //centering hashtags once populated
    let mrkerTxt = document.getElementById((id+"markertxt"));
    let lft = (mrkerTxt.offsetLeft + mrkerTxt.offsetWidth/2) - 20;
    let lftStr = "-" + lft + "px";
    //mrkerTxt.style["left"] = lftStr;
    console.log("useEffect lft: "+lftStr )
    setLeft(lftStr);
   
  }, []);
    
return (


<div id={parentID} className="marker"><div id={id} onClick={onClick}> <img id="pin"src={pin} alt=''/><div id={id + "markertxt"} className="hashtagBG" style={{ left:txtleft }}>{text}</div></div>

<div id={id2} onClick={onClick} hidden> <img className="pin_selected"src={pin_selected} alt=''/><div id={id + "markertxt"} className="hashtagBG" style={{ left:txtleft }}>{text}</div></div>
    </div>
)}

export default Marker



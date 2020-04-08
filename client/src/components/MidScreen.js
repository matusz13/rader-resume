import React, { Component } from 'react';


class MidScreen extends Component {
  render() {
    return (
        
        <div className="App-bg-sm">
        <div className="App-mid">
        <div className="App-header-mid">
        
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
        <div id="hex6-mid" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <div id="hex7" className="hexagon-wrapper">
                <div id="color1" className="hexagon"></div></div>
        <img className="InfoPic" src={this.props.me } alt=""/>
      
         { this.props.infoz.map(info =>
          <div className="blue-highlight name-mid"><h2>{info.full_name}</h2></div>)}
            { this.props.infoz.map(info =>
          <div className="summary-sm"><h9>{info.summary}</h9></div>)}
        {this.props.infoz.map(info =>
        <div className="blue-highlight devspace"><b>{info.devspace}</b></div>)}
        <div className="devspace"><li><a href="/addressbook" >Address Book</a>{" "}(using react/redux ) </li></div>
        <div className="devspace"><li><a href="/shortener" >URL shortener</a>{" "}(uses nodejs, express, mongodb, reactjs) </li></div>
        <div className="devspace"><li><a href="/geotweets" >Google Twitter mashup</a>{" "}(reactjs Hooks api, Twitter and Google Maps api) </li></div>
        <div className="devspace"><li><a href="https://github.com/matusz13/rader-resume" >Github</a>{" "}(check out my code!) </li></div>


        { this.props.infoz.map(info =>
            <div className="info"><h6>{info.location}<br/>{info.phone}<br/>
        <a href="mailto:matusz13@gmail.com">{info.email}</a>
        </h6>
        </div>
    )}
        <div className="content"><div className="Jobs"><div className="SecTitle"><h5>{ this.props.infoz.map(info =><b>{info.experience}</b> )}</h5></div>
        
        <div className="SkillPad">
               { this.props.jobz.map(job =>
                  <div className="Job-sm">
                    <div className="blue-highlight"><b>{job.job_name}</b><br/><div className="white-highlight">{job.job_title +  " " +job.start_date + "-" + job.end_date}</div></div>
                    
                     {job.responsibilities[0].map(respo =>
                             <li>{respo}</li>
                    )}
                  </div>
                )}</div>
      </div>
        <div className="Skills"><div className="SkillTitle-mid"><h5>{ this.props.infoz.map(info =><b>{info.skills}</b> )}</h5></div>
<div className="SkillPad">
            { this.props.skillz.map(skill =>
               
                  <div className="Skill">
                    <r/>
                   <div className="blue-highlight"><b>{skill.skills_title}</b></div>
                     {skill.skill_list[0].map(lang =>
                             <li>{lang}</li>
                    )}
                  </div>
                )}</div>
                    </div></div></div></div></div>     

        
    );
  }
}

export default MidScreen;
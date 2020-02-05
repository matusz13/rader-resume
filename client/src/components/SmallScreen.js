import React, { Component } from 'react';


class SmallScreen extends Component {
  render() {
    return (
        
        <div className="App-bg-sm">
        <div className="App-sm">
        <div className="App-header">
        
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
        <img className="InfoPic" src={this.props.me} alt=""/>
      
         { this.props.infoz.map(info =>
          <div className="blue-highlight name"><h2>{info.full_name}</h2></div>)}
     { this.props.infoz.map(info =>
          <div className="summary"><h9>{info.summary}</h9></div>)}
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
                    <div className="blue-highlight"><b>{job.job_name}</b><br/><div className="white-highlight">{job.job_title }</div><br/>
                        <div>{ job.start_date + "-" + job.end_date}</div></div>
                    
                     {job.responsibilities[0].map(respo =>
                             <li>{respo}</li>
                    )}
                  </div>
                )}</div>
      </div>
        <div className="Skills"><div className="SkillTitle"><h5>{ this.props.infoz.map(info =><b>{info.skills}</b> )}</h5></div>
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

export default SmallScreen;
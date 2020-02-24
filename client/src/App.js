import React from 'react';
import Firebase from 'firebase';
import config from './config';
import me from './images/me.png';


import DefaultScreen from './components/DefaultScreen.js';
import MidScreen from './components/MidScreen.js';
import  './App.css';

class App extends React.Component {
    
    _isMounted = false;

  constructor(props){
    super(props);

    if (!Firebase.apps.length) {
        initializeFirebase();
    }
    this.state = { isLoading: true}
    
    const jobRef = Firebase.database().ref('/jobs');
    jobRef.on('value', (snapshot) => {
        
        let jobs = snapshot.val();
        let jobState = [];
        for (let job in jobs){
            jobState.push({
                job_name: jobs[job].job_name,
                job_title: jobs[job].job_title,
                start_date: jobs[job].start_date,
                end_date: jobs[job].end_date,
                responsibilities: jobs[job].responsibilities
            })
        }
        this.setState({
            jobs: jobState,
            isLoading:true
        })
    })
      
    const infoRef = Firebase.database().ref('/info');
    infoRef.on('value', (snapshot) => {
        let infos = snapshot.val();
        let infoState = [];
        for (let info_x in infos){
            infoState.push({
                full_name: infos[info_x].full_name,
                phone: infos[info_x].phone,
                location: infos[info_x].location,
                email: infos[info_x].email,
                summary: infos[info_x].summary,
                experience: infos[info_x].experience,
                skills: infos[info_x].skills,
                devspace:infos[info_x].devspace
            })
        }
    
    this.setState({
        infos: infoState,
        isLoading:true
    })
    })
              
    const skillRef = Firebase.database().ref('/skills');
    skillRef.on('value', (snapshot) => {
        let skills = snapshot.val();
        let skillState = [];
      
        for (let skill in skills){
            skillState.push({
                skills_title: skills[skill].skill_title,
                skill_list: skills[skill].skill_list,
               
            })
        }
        this.setState({
            matches: window.matchMedia("(min-width: 900px)").matches,
            skills: skillState,
            isLoading:false
        })
    }) 
  }


componentDidMount() {
    const handler = e => this.setState({matches: e.matches});
    window.matchMedia("(min-width: 900px)").addListener(handler);
}
 
render() {
    let jobz = this.state.jobs;
    let skillz = this.state.skills;
    let infoz = this.state.infos;
    let scale = this.state.scale;
    
    return (
    this.state.isLoading ? <LoadingScreen/> : <React.StrictMode>
       <div>
        {!this.state.matches ? <MidScreen me={me} infoz={infoz} skillz={skillz} jobz={jobz} scale={scale}/>
        
        :<DefaultScreen me={me} infoz={infoz} skillz={skillz} jobz={jobz}/>
        }
        </div></React.StrictMode>
    )
}
        
        }
        
function LoadingScreen(){
    //todo: better loading screens
    return(
        <div className="LoadingScreen"><h3>loading</h3>
        </div>
   )
        }

function initializeFirebase(){  
    Firebase.initializeApp(config);

}
        
export default App;




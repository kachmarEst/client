import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../assets/css/card.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from '../../components/nav';
class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state ={
        prof_id:'',
        elements:[],
        err:'',
        classes:[],
        sessions:[]
    }
}


  componentDidMount(){
    let lsnpx = localStorage.getItem('_LsnPx');
   
    if(lsnpx){
        let headers={
            'x-auth-token':lsnpx
          }
      axios.get("//localhost:5000/auth/check",{
        headers:headers
      })
      .then(res=>{     
        this.setState({
          prof_id:res.data.user.id
        })
        this.loadElements(this.state.prof_id);
        this.loadSessions(this.state.prof_id);

    })
      .catch(
        err => {
            console.log(err);
          localStorage.removeItem('_LsnPx');
          localStorage.clear();

        }
      );

    }

 }

 loadSessions=(id)=>{
  const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json',
    'x-auth-token':localStorage.getItem('_LsnPx')
     } 
console.log(id)
    axios.get('//localhost:5000/sessions/all/'+id  ,{headers:headers})
    .then(res =>{
        this.setState({
           sessions:res.data.sessions
        });
    })
    .catch(error =>{
        // this.setState({err:error.response.data.msg})
        console.log(error);
        console.log(error.response)
    });

 }

 loadElements = (id) =>{
  
  const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json',
    'x-auth-token':localStorage.getItem('_LsnPx')
     } 
console.log(id)
    axios.get('//localhost:5000/users/dashboard/'+id  ,{headers:headers})
    .then(res =>{
        this.setState({
            classes:res.data.classes,
            elements:res.data.elements
        });
    })
    .catch(error =>{
        this.setState({err:error.response.data.msg})
    });

}

 Mapping = ()=>{
  return this.state.elements.map((element)=>{

   let theC=this.state.classes.find(clas =>clas._id == element.class_id);

   return(
   <div className="card" >
    <div className="card-header">Classe : {theC.filiere} {theC.annee}</div>
    <div className="card-body">

      <h5 className="card-title"> {element.element}</h5>

      <p className="card-text"><Link className="btn" to={"/session/"+element._id}>Nouvelle session</Link></p>
    </div>
  </div>
   )

  })

 }


 MappingSessions=()=>{
if(this.state.sessions){
  return this.state.sessions.map((session)=>{
    let theE=this.state.elements.find(element => element._id == session.element_id);
    let theC=this.state.classes.find(clas =>clas._id == theE.class_id);
    if(theE && theC){
      return(
        <div className="card" >
         <div className="card-header">( {theC.filiere} {theC.annee} )       {session.hdeb} to {session.hfin}</div>
         <div className="card-body">
     
           <h5 className="card-title">  {theE.element}</h5>
     
           <p className="card-text"><Link className="btn" to={"/sessions/"+session._id}>Gérer les absences</Link></p>
           <p className="card-text">{session.createdAt}</p>
  
         </div>
       </div>
        )
    }else{
      return '';
    }
   
  })
 }

else{
  return '';
}
 }


  render() {
    return (


        <div className="container-fluid">
            <Nav />
        
    <div className="row">
      <div className="col">
      <h1>Vos Classes</h1>
      {this.Mapping()}
      </div>
    

      <div className="col">
      <h1>Vos Sessions</h1>
      {this.MappingSessions()}
      </div>
      
</div>
        </div>
    );
  }
}

export default Dashboard;

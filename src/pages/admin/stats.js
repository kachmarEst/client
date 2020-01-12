import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../assets/css/classe.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class Stats extends React.Component {

  constructor(props){
    super(props);
    this.state ={
        filiere:'',
        annee:'',
        err:'',
        counts:[],
        elements:[]
    }
}


loadCounts = () =>{
  const headers = {
      'Content-Type':'application/json',
      'Accept':'application/json',
      'x-auth-token':localStorage.getItem('_Gtx')
       } 

      axios.get('//localhost:5000/absences/counts/stats',{headers:headers})
      .then(res =>{
          this.setState({counts:res.data});
          console.log(res.data)
      })
      .catch(error =>{
          this.setState({err:error.response?error.response.data.msg:''})
          console.log(error)

      });

}
loadElements = () =>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
  
        axios.get('//localhost:5000/elements',{headers:headers})
        .then(res =>{
            this.setState({elements:res.data});
            console.log(res.data)
        })
        .catch(error =>{
          this.setState({err:error.response?error.response.data.msg:''})
          console.log(error)
        });
  
  }
  


  componentDidMount(){
    let gtx = localStorage.getItem('_Gtx');
   
    if(gtx){
        let headers={
            'x-auth-token':gtx
          }
      axios.get("//localhost:5000/auth/check",{
        headers:headers
      })
      .then(res=>{

        console.log(res);
     
    })
      .catch(
        err => {
            console.log(err);
          localStorage.removeItem('_Gtx');
          localStorage.clear();

        }
      );

    }
    this.loadElements();
    this.loadCounts();

 }



mappingUsers = () =>{
  return this.state.counts.map((item) =>{
      let element = this.state.elements.find((element)=> element._id == item._id);
return(

<div class="card border-success mb-3" >
  <div class="card-header">Element : {element?element.element:''}</div>
  <div class="card-body text-success">
    <h5 class="card-title">{item.hours} hours</h5>
  </div>
</div>);
}
    )
}

  render() {
    return (


      <div className="container-fluid">
      <Navbar />
  <h1>Statistics</h1>
  <h6>Absences per Elements</h6>


    {this.mappingUsers()}



  

  </div>
    );
  }
}

export default Stats;

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
import Navy from '../../components/navy';
class Profile extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         users:[],
         hours:'',
         student_id:'',
         err:''
     }
    }
    
    Hours =(id)=>{
      const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_DCLsPA')
         } 
      axios.get('//localhost:5000/users/'+id,{headers:headers})
      .then((res)=>{
        this.setState({
          hours:res.data.hours
        })
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  componentDidMount(){
    let gtx = localStorage.getItem('_DCLsPA');
   
    if(gtx){
        let headers={
            'x-auth-token':gtx
          }
      axios.get("//localhost:5000/auth/check",{
        headers:headers
      })
      .then(res=>{

          this.setState({
            student_id:res.data.user.id
          })
          this.Hours(this.state.student_id);

     
    })
      .catch(
        err => {
            console.log(err);
          localStorage.removeItem('_DCLsPA');
          localStorage.clear();

        }
      );

    }
 }

  render() {
    return (


        <div className="container-fluid">
          <Navy />
<h1>you have been absent for {this.state.hours} hours  </h1>          
        </div>
    );
  }
}

export default Profile;

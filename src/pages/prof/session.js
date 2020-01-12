import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../assets/css/edit.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Nav from '../../components/nav';
class Session extends React.Component {

  constructor(props){
    super(props);
    this.state ={
        prof_id:'',
        hdeb:'',
        hfin:'',
        element_id:this.props.match.params.id,
        err:'',
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


OnChange = (e)=>{
if(e.target.name=='hdeb'){ this.setState({hdeb:e.target.value})}


if(e.target.name=='hfin'){ this.setState({hfin:e.target.value})}
}

Creating = (e)=>{
    e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_LsnPx')
             } 
        const cred = {
            hdeb:this.state.hdeb,
            hfin:this.state.hfin,
            element_id:this.state.element_id,
            prof_id:this.state.prof_id
        }
        axios.post('//localhost:5000/sessions/add',cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });

    
}

  render() {
    return (


        <div className="container-fluid">
            <Nav />
  <h1>Nouvelle session</h1> 
  <form style={{margin:'1%'}} className="form" onSubmit={this.Creating} >
                    
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 

                    <div className="from-group">
                <label>Heure de début</label>
                    <input type="text" className="form-control" onChange={this.OnChange} name="hdeb" placeholder="Heure de début de la session" />
                    </div>
                    <div className="from-group">
                <label>Heure de fin</label>
                    <input type="text" className="form-control" onChange={this.OnChange} name="hfin" placeholder="Heure de fin de la session" />
                    </div>
            
                    
                
                    <button className="btn" id="bt">Ajouter</button>
    
                </form>
  </div>

    );
  }
}

export default Session;

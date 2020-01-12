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
class ElementList extends React.Component {

    constructor(props){
     super(props);
     this.state= {
         elements:[],
         classes:[],
         profs:[],
         err:''
     }
    }

    

    loadElements = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/elements/all',{headers:headers})
            .then(res =>{
                this.setState({
                    elements:res.data.elements,
                    profs:res.data.profs,
                    classes:res.data.classes
                });
                console.log(res.data)
            })
            .catch(error =>{
                // this.setState({err:error.response.data.msg})
                console.log(error.response)
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

        // console.log(res);
     
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
 

    
 }

 clicked = (id)=>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
         axios.delete('//localhost:5000/elements/'+id,{headers:headers})
         .then(res =>{
             console.log(res.data.msg)
             this.loadElements();
        })
         .catch(error =>{
            this.setState({err:error.response.data.msg});
         });

 }

 mappingElements = () =>{
      
 let pro;
 let cla;
     return this.state.elements.map((item) =>{
        pro = this.state.profs.find((prod) => prod._id == item.prof_id);
        cla = this.state.classes.find((clad) => clad._id == item.class_id);

return(   <tr >
        
    <td>{item.element }</td>
   <td>{  pro.firstName }&nbsp;{  pro.lastName }  </td> 
    <td>{cla.filiere} {cla.annee}</td>
   <td>{item.createdAt}</td>
   <td><Link className="btn " id="edit" to={"/element/"+item._id} ><i class="fa fa-edit"></i></Link> &nbsp;
  <button onClick={() => this.clicked(item._id)} id="delete" className="btn "><i class="fa fa-trash"></i></button></td>
 </tr>);
     }
 
       )
 }
  render() {
    return (

        <div className="container-fluid">
            <Navbar />
        
       <span className="form-inline"> <h1>Elément</h1>     <Link className="btn" to="/elements/add" ><i className="fa fa-plus"></i></Link></span>
        <h6>Liste des éléments</h6>
        <span style={{color: 'red'}}>{this.state.err != '' ?this.state.err : ''}</span> 

        <table className="table">
  <thead className="thead-dark">
    <tr>

      <th scope="col">Element</th>
      <th scope="col">Professeur</th>
      <th scope="col">Classe</th>
      <th scope="col">Crée le</th>
      <th></th>


    </tr>
  </thead>
  <tbody>
   
  {this.mappingElements()}
  </tbody>
</table>
        </div>
    );
  }
}

export default ElementList;

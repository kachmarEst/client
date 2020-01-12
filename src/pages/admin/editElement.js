import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../assets/css/edit.css';

class EditElement extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            class_id:'',
            prof_id:'',
            element:'',
            firstName:'',
            lastName:'',
            filiere:'',
            annee:'',
            classes:[],
            profs:[],
            constp:'',
            constc:'',

            err:''
        }
    }
    
    
    loadProfs = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/users/profs/data',{headers:headers})
            .then(res =>{
                this.setState({profs:res.data});
                console.log(res.data)
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
            });

    }

    
loadClasses = () =>{
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
  
        axios.get('//localhost:5000/classes',{headers:headers})
        .then(res =>{
            this.setState({classes:res.data});
            console.log(res.data)
        })
        .catch(error =>{
            this.setState({err:error.response.data.msg})
        });
  
  }
    loadElements = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/elements/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                    class_id:res.data.elem.class_id,
                    prof_id:res.data.elem.prof_id,
                    constc:res.data.elem.class_id,
                    constp:res.data.elem.prof_id,
                    element:res.data.elem.element,
                    firstName:res.data.prof.firstName,
                    lastName:res.data.prof.lastName,
                    filiere:res.data.clas.filiere,
                    annee:res.data.clas.annee,
                });
            })
            .catch(error =>{
                this.setState({err:error.response.data.msg})
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
    this.loadClasses();    
    this.loadProfs();    
    this.loadElements();    
 }


 AddElement = (e) =>{
    e.preventDefault();
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'x-auth-token':localStorage.getItem('_Gtx')
         } 
    const cred = {
        element:this.state.element,
        class_id:this.state.class_id,
        prof_id:this.state.prof_id
    }
    axios.post('//localhost:5000/elements/update/'+this.props.match.params.id,cred,{
        headers:headers
    })
    .then(
        res =>{
            this.props.history.push('/elements');

        }
    )
    .catch(error =>{
        this.setState({
            err:error.response.data.msg
        })
    });


}
   
    onChangeProfId = (e) =>{
        this.setState({
            prof_id: e.target.value
        })
    }
    onChangeElement = (e) =>{
        this.setState({
            element: e.target.value
        })
    }
    onChangeClassId = (e) =>{
        this.setState({
            class_id: e.target.value
        })
    }


  render() {
  
    let optionsC = this.state.classes.filter(((item) => item._id != this.state.constc)).map((data) =>
    <option 
        key={data._id}
        value={data._id}
    >
        {data.filiere} {data.annee}
    </option>
);


let optionsP = this.state.profs.filter(((item) => item._id != this.state.constp)).map((data) =>
<option 
    key={data._id}
    value={data._id}
>
    {data.firstName}  {data.lastName} 
</option>
);


    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Elément</h1>


        
        <form className="formm" onSubmit={this.AddElement} >
                    
                    <h6>Modifier l'élément</h6>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 

                    <div className="from-group">
                <label>Elément</label>
                    <input type="text" className="form-control" onChange={this.onChangeElement} value={this.state.element} name="element" id="element" placeholder="element" />
                    </div>
                    <div className="from-group">
                <label>Professeur</label>
                    <select  type="text" className="form-control" onChange={this.onChangeProfId} name="prof_id">
    <option value={this.state.prof_id} >{this.state.firstName} {this.state.lastName}</option>

                    {optionsP}
                
                    </select>
                    </div>
                    <div className="from-group">
                <label>Classes</label>
                    <select type="text" className="form-control" onChange={this.onChangeClassId} name="class_id"  >
       <option value={this.state.class_id} >{this.state.filiere} {this.state.annee}</option>
       {optionsC}

                    </select>
                    </div>
             
                    <button className="btn" id='bt'>Modifier</button>
    
                </form>
        </div>
    );
  }
}

export default EditElement;

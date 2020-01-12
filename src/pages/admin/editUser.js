import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={          
            class_id:'',
            lastName:'',
            firstName:'',
            filiere:'',
            annee:'',
            role:'',
            classes:[],
            constc:'',
            err:''
        }
    }
    

    loadUser = () =>{
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 

            axios.get('//localhost:5000/users/'+this.props.match.params.id,{headers:headers})
            .then(res =>{
                this.setState({
                   firstName:res.data.firstName,
                   role:res.data.role,
                   lastName:res.data.lastName,
                   constc:res.data.class_id,
                   class_id:res.data.class_id

                });
                console.log(res.data.username)
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
    this.loadUser();
    this.loadClasses();

 }

    EditUser = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            password:this.state.password,
            class_id:this.state.class_id,
            role:this.state.role
        }
        axios.post('//localhost:5000/users/update/'+this.props.match.params.id,cred,{
            headers:headers
        })
        .then(
            res =>{
                console.log(res.data.msg)
                this.props.history.push('/users');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

 
    onChangePass = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeFn = (e) =>{
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLn = (e) =>{
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeCID= (e) =>{
        this.setState({
            class_id: e.target.value
        })
    }



  render() {
      let dacl = this.state.classes.find((item) => item._id == this.state.constc);
    let optionsC = this.state.classes.filter(((item) => item._id != this.state.constc)).map((data) =>
    <option 
        key={data._id}
        value={data._id}
    >
        {data.filiere} {data.annee}
    </option>
);
    return (


        <div className="container-fluid">
            <Navbar />
        <h1>Utilisateur</h1>


        
        <form className="formm" onSubmit={this.EditUser} >
                    <h6>Modifier l'utilisateur</h6>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                   
                    <div className="from-group">
                <label>firstName</label>
                    <input type="text" className="form-control" onChange={this.onChangeFn} value={this.state.firstName} name="firstName" id="firstName"  placeholder="firstName" />
                    </div>

                    <div className="from-group">
                <label>lastName</label>
                    <input type="text" className="form-control" onChange={this.onChangeLn} value={this.state.lastName} name="lastName" id="lastName"  placeholder="lastName" />
                    </div>

                    <div className="from-group">
                <label>Filière</label>
                <select className="form-control" onChange={this.onChangeCID} name="class_id" >
                <option value={this.state.class_id} >{dacl ? dacl.filiere:''}{dacl ? dacl.annee:''}</option>
                {optionsC}
                </select>
                    </div>
                    <div className="from-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" onChange={this.onChangePass}  name="password" id="pass"  placeholder="Mot de passe" />
                    </div>
                    <button className="btn" id='bt'>Modifier</button>
    
                </form>
        </div>
    );
  }
}

export default EditUser;

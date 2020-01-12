import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import '../../assets/css/edit.css';
class AddUser extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username:'',
            classes:[],
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            class_id:'',
            role:'',
            cne:'',
            cin:''
        }
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

    AddUser = (e) =>{
        e.preventDefault();
        const headers = {
            'Content-Type':'application/json',
            'Accept':'application/json',
            'x-auth-token':localStorage.getItem('_Gtx')
             } 
        const cred = {
            username:this.state.username,
            email:this.state.email,
            role:this.state.role,
            cne:this.state.cne,
            cin:this.state.cin,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            class_id:this.state.class_id,
            password:this.state.password
        }
        axios.post('//localhost:5000/users/add',cred,{
            headers:headers
        })
        .then(
            res =>{
                this.props.history.push('/users');

            }
        )
        .catch(error =>{
            this.setState({
                err:error.response.data.msg
            })
        });


    }

    onChangeEmail = (e) =>{
        this.setState({
            email: e.target.value
        })
    }
    onChangePass = (e) =>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeUser = (e) =>{
        this.setState({
            username: e.target.value
        })
    }
    onChangeCne = (e) =>{
        this.setState({
            cne: e.target.value
        })
    }
    onChangeCin = (e) =>{
        this.setState({
            cin: e.target.value
        })
    }
    onChangeClass = (e) =>{
        this.setState({
            class_id: e.target.value
        })
    }
    onChangeRole = (e) =>{
        this.setState({
            role: e.target.value
        })
    }
    onChangeFirst = (e) =>{
        this.setState({
            firstName: e.target.value
        })
    }
    onChangeLast = (e) =>{
        this.setState({
            lastName: e.target.value
        })
    }


  render() {
    let optionsC = this.state.classes.map((data) =>
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


        
        <form className="formm"  onSubmit={this.AddUser} >
                    
                    <h6>Ajouter un utilisateur</h6>
                    <span style={{color: 'red'}}>{this.state.err != '' ?JSON.stringify(this.state.err) : ''}</span> 
                    <div className="from-group">
                <label>Email</label>
                    <input type="email" className="form-control" onChange={this.onChangeEmail} name="email" id="email" placeholder="email" />
                    </div>
                    <div className="from-group">
                <label>Nom d'utilisateur</label>
                    <input type="text" className="form-control" onChange={this.onChangeUser} name="username" id="user"  placeholder="Nom d'utilisateur" />
                    </div>
                    <div className="from-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" onChange={this.onChangePass} name="password" id="pass"  placeholder="Mot de passe" />
                    </div>

                    <div className="from-group">
                    <label>first Name</label>
                    <input type="text" className="form-control" onChange={this.onChangeFirst}  placeholder="FirstName" />
                    </div>
                    <div className="from-group">
                    <label>last Name</label>
                    <input type="text" className="form-control" onChange={this.onChangeLast}  placeholder="LastName" />
                    </div>
                    <div className="from-group">
                    <label>CNE</label>
                    <input type="text" className="form-control" onChange={this.onChangeCne}  placeholder="CNE" />
                    </div>
                    <div className="from-group">
                    <label>CIN</label>
                    <input type="text" className="form-control" onChange={this.onChangeCin}  placeholder="CIN" />
                    </div>
                    <div className="from-group">
                    <label>Role</label>
                    <select type="text" className="form-control" onChange={this.onChangeRole}  placeholder="Role" >      
                    <option>Chose a role</option>

                    <option value="admin">Admin</option>
                    <option value="prof">Professor</option>
                    <option value="student">Student</option>
                    </select>
                    </div>
                    <div className="from-group">
                <label>Filière</label>
                <select className="form-control" onChange={this.onChangeClass} name="class_id" >
            <option>choisissez la filière</option>
                {optionsC}
                </select>
                    </div>
                    <button className="btn" id="bt"  >Ajouter</button>
    
                </form>
        </div>
    );
  }
}

export default AddUser;

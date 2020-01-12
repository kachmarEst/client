import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './Logins/loginAdmin';
import axios from 'axios';
import Navbar from './components/navbar';
import Home from './pages/admin/home';
import PrivateRoute from './middleware/privateRoute';
import ProfRoute from './middleware/profRoute';
import ProfRoutee from './middleware/profRoutee';
import PrivateRoutee from './middleware/privateRoutee';
import UserList from './pages/admin/userList';
import AddUser from './pages/admin/addUser';
import EditUser from './pages/admin/editUser';
import EditClass from './pages/admin/editClass';
// import AddProf from './pages/admin/addProf';
// import ProfList from './pages/admin/profList';
// import EditProf from './pages/admin/editProf';
import ElementList from './pages/admin/ElementList';
import AddElement from './pages/admin/addElement';
import EditElement from './pages/admin/editElement';
// import AddStudent from './pages/admin/addStudent';
// import StudentList from './pages/admin/studentList';
// import EditStudent from './pages/admin/editStudent';
import Dashboard from './pages/prof/dashboard';
import Session from './pages/prof/session';
import GAB from './pages/prof/gab';
import StudentRoute from './middleware/profRoutee';
import Profile from './pages/student/profile';
import Stats from './pages/admin/stats';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
   
    }
  }

 


  render() {

    return(


<Router>
<Switch>
  <PrivateRoute exact path="/dashboard" component={Stats} />
  <PrivateRoute exact path="/users" component={UserList} />
  <PrivateRoute exact path="/classes" component={Home} />

  <PrivateRoute exact path="/elements" component={ElementList} />
  <PrivateRoute exact path="/user/:id" component={EditUser} />
  <PrivateRoute exact path="/element/:id" component={EditElement} />
  <PrivateRoute exact path="/class/:id" component={EditClass} />
  <PrivateRoute exact path="/users/add" component={AddUser} />

  <PrivateRoute exact path="/elements/add" component={AddElement} />
  <PrivateRoutee exact path="/login" component={LoginAdmin} />
  <ProfRoute exact path="/" component={Dashboard}/>
  <ProfRoute exact path="/session/:id" component={Session}/>
  <ProfRoute exact path="/sessions/:id" component={GAB}/>
  <StudentRoute exact path="/profile" component={Profile}/>

</Switch>
</Router>


     
    );
  }
}


export default App;

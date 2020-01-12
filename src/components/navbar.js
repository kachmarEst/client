import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/nav.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Navbar extends React.Component {

    constructor(props){
        super(props);
      }

    clicked = () =>{
        localStorage.removeItem('_Gtx');
        localStorage.clear();
    }

    render() {
        return (

          <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
          <Link className="navbar-brand " to="/">Admin</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link  className="nav-link" to="/">Statistics<span className="sr-only">(current)</span></Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to ="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Listes</Link>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link  className="dropdown-item" to="/users">Liste des utilisateurs</Link>                  
                      <Link  className="dropdown-item" to="/elements">Liste des éléments</Link>
                      <Link  className="dropdown-item" to="/classes">Liste des Classes</Link>

                    </div>
                  </li>
                               
              </ul>
              <form class="form-inline ">
                <button class="btn " id="dec" onClick={this.clicked}><i className="fa fa-sign-out "></i></button>
              </form>
          </div>
      </nav>
           
        );
    }
}

export default Navbar;

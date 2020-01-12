import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
class Nav extends React.Component {

    constructor(props){
        super(props);
      }

    clicked = () =>{
        localStorage.removeItem('_LsnPx');
        localStorage.clear();
    }

    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <Link className="navbar-brand " to="/">Professeur</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link  className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
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

export default Nav;

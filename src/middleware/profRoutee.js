import React from 'react';
import { Route, Redirect } from 'react-router-dom';



const StudentRoute = ({component: Component, ...rest}) => {
    let dclspa = localStorage.getItem('_DCLsPA');
    
    return (
  // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            dclspa ?
                <Component {...props} />

            : <Redirect to="/login" />
        )} />
    );
};

export default StudentRoute;





import React from 'react';
import { Route, Redirect } from 'react-router-dom';




const ProfRoute = ({component: Component, ...rest}) => {
    let lsnpx = localStorage.getItem('_LsnPx');
    
    return (
  // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            lsnpx ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default ProfRoute;




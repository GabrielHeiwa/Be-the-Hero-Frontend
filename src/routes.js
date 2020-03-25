import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/incidents/new" component={NewIncident}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/register" component={Register}/>
                <Route path="/" exact component ={Logon} />
            </Switch>
        </BrowserRouter>

    );
}
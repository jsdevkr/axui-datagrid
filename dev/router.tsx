import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {About, Header, MembersPage} from './components';
import 'semantic-ui-css/semantic.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div className="">
                <Header />
                <Switch>
                    <Route exact path="/" component={About} />
                    <Route path="/about" component={About} />
                    <Route path="/members" component={MembersPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

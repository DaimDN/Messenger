import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Header from './Header';
  import Intro from './Intro';
  import Chat from './Chat';

export default class Routes extends Component {
    render() {
        return (

            <Router>
                     
            <div>
            <Header/>

            <Switch>
                <Route path="/chat">
                <Chat/>
                </Route>
                <Route path="/">
                <Intro/>
                </Route>
            </Switch>
          

            </div>

            </Router>
        )
    }
}


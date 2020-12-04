import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import RecommendedVideos from "./components/RecommendedVideos";
import SearchVideos from "./components/SearchVideos";


function App() {
  return (
    <div className="App">
        <Router >
            <Header />

            <Switch >
                <Route exact path="/" >
                    <div className="content">
                        <SideBar />
                        <RecommendedVideos />
                    </div>
                </Route>

                <Route exact path="/search/:searchTerm" >
                    <div className="content">
                        <SideBar />
                        <SearchVideos />
                    </div>
                </Route>

                <Redirect to="/" />
            </Switch>
        </Router>
    </div>
  );
}

export default App;

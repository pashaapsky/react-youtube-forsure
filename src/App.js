import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {AuthContext} from './context/AuthContext';
import {DataContext} from "./context/DataContext";
import Search from "./pages/Search";
import InTrends from "./pages/InTrends";
import Subscriptions from "./pages/Subscriptions";
import axios from "./configs/youtube";
import WatchVideo from "./pages/WatchVideo";
import "./scss/default.scss";
import useAuth from "./hooks/auth.hook";

function App() {
    const {user, setUser, token, setToken, logout, login} = useAuth();
    const [subscriptions, setSubscriptions] = useState([]);

    const isAuthenticated = !!token;

    useEffect(() => {
        console.log('logout', logout);

        async function getSubscriptions(maxResults = 30) {
            try {
                // каналы пользователя - id`s
                const channels = await axios.get('/subscriptions', {
                        params: {
                            part: "snippet",
                            mine: true,
                            maxResults: maxResults
                        },
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Accept": "application/json"
                        }
                    })
                ;

                if (channels) {
                    setSubscriptions(channels.data.items);
                }
            } catch (e) {
                console.log('e', e.message);
                // 1 часовой OAuth token from firebase handler error
                const storageName = 'userData';
                const data = JSON.parse(localStorage.getItem(storageName));

                if (data) {
                    logout();
                }
            }
        }

        if (token) {
            getSubscriptions();
        }
    }, [logout, token]);


    // console.log('user', user);
    // console.log('token', token);
    // console.log('subscription', subscribtions);
    // console.log('auth', isAuthenticated);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, user, setUser, token, setToken, logout, login
        }}>
            <DataContext.Provider value={{
                subscriptions
            }}>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>

                            <Route exact path="/trending/">
                                <InTrends/>
                            </Route>

                            <Route path="/trending/music">
                                <InTrends categoryName="Музыка" categoryId={10}/>
                            </Route>

                            <Route path="/trending/animals">
                                <InTrends categoryName="Животные" categoryId={15}/>
                            </Route>

                            <Route path="/trending/games">
                                <InTrends categoryName="Видео игры" categoryId={20}/>
                            </Route>

                            <Route path="/trending/films">
                                <InTrends categoryName="Фильмы" categoryId={1}/>
                            </Route>

                            <Route path="/search/:searchTerm">
                                <Search/>
                            </Route>

                            <Route path="/watch">
                                <WatchVideo/>
                            </Route>

                            <Route path="/login">
                                <Login/>
                            </Route>

                            {isAuthenticated &&
                            <Route exact path="/subscriptions">
                                <Subscriptions/>
                            </Route>}

                            <Redirect to="/"/>
                        </Switch>
                    </Router>
                </div>
            </DataContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;

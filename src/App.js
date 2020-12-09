import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {AuthContext} from './context/AuthContext';
import {DataContext} from "./context/DataContext";
import Search from "./pages/Search";
import InTrends from "./pages/InTrends";
import Subscribtions from "./pages/Subscribtions";
import "./scss/default.scss";
import axios from "./configs/youtube";
import WatchVideo from "./pages/WatchVideo";

function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [subscribtions, setSubscribtions] = useState([]);

    const isAuthenticated = !!token;

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('userData');
    };

    const getSubscriptions = useCallback(
        async (maxResults = 30) => {
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
                    setSubscribtions(channels.data.items);
                }
            } catch (e) {
                // 1 часовой OAuth token from firebase handler error
                const storageName = 'userData';
                const data = JSON.parse(localStorage.getItem(storageName));

                if (data) {
                    logout();
                }

                console.error(e.message)
            }
        }, [token]);

    // проверка авторизации
    useEffect(() => {
        const storageName = 'userData';

        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            setToken(data.token);
            setUser(data.user);

            localStorage.setItem(storageName, JSON.stringify({
                token: data.token, user: data.user
            }));
        }
    }, []);

    // загрузка каналов подписчиков
    useEffect(() => {
        if (token) {
            getSubscriptions();
        }
    }, [token, getSubscriptions]);

    console.log('user', user);
    console.log('subscription', subscribtions);


    return (
        <AuthContext.Provider value={{
            isAuthenticated, token, setToken, user, setUser, logout
        }}>
            <DataContext.Provider value={{
                subscribtions
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
                                <WatchVideo />
                            </Route>

                            <Route path="/login">
                                <Login/>
                            </Route>

                            {isAuthenticated &&
                            <Route excat path="/subscribtions">
                                <Subscribtions/>
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

import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {AuthContext} from './context/AuthContext';
import Search from "./pages/Search";
import InTrends from "./pages/InTrends";


function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const isAuthenticated = !!token;

    // проверка авторизации
    useEffect(() => {
        const storageName = 'userData';

        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            setToken(data.token);
            setUser(data.user);
        }
    },[]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('userData');
    };

    console.log('user', user);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, token, setToken, user, setUser, logout
        }}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/trending/">
                            <InTrends />
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
                            <Search />
                        </Route>

                        <Route path="/login">
                            <Login/>
                        </Route>

                        <Redirect to="/"/>
                    </Switch>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import axios from './configs/youtube';
import Home from "./pages/Home";
import Login from "./pages/Login";
import {AuthContext} from './context/AuthContext';
import Search from "./pages/Search";


function App() {
    const [videos, setVideos] = useState([]);
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

            // localStorage.setItem(storageName, JSON.stringify({
            //     user, token
            // }));
        }
    },[]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('userData');
    };

    const getVideos = async () => {
        //mostPopular = https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&key=API_KEY
        const response = await axios.get('/search', {
                params: {
                    q: "fly",
                    type: "video",
                    relatedToVideoId: "wtLJPvx7-ys"
                }
            })
                .catch(e => {
                    console.log(e.message)
                })
        ;

        if (response) {
            setVideos(response.data.items);
        }

        console.log('response', response);
        // console.log('videos', videos);
    };

    // load videos
    useEffect(() => {
        // getVideos();
    }, []);

    console.log(isAuthenticated);

    return (
        <AuthContext.Provider value={{
            isAuthenticated, token, setToken, user, setUser, logout
        }}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>

                        <Route exact path="/search/:searchTerm">
                            <Search/>
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

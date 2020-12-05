import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {firebaseConfig} from "../configs/firebase";
import firebase from "firebase";

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

function Login(props) {
    const {setToken, setUser} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const result = firebase.auth().signInWithPopup(provider)
            .then(res => {
                    const token = res.credential.accessToken;
                    const user = res.user;

                    setToken(token);
                    setUser(user);

                    const storageName = 'userData';

                    localStorage.setItem(storageName, JSON.stringify({
                        user, token
                    }));

                    return history.push('/');
                }
            )
            .catch(error => {

            });
    });

    return (
        <div></div>
    );
}

export default Login;
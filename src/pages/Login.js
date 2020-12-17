import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {FirebaseContext} from "../context/FirebaseContext";

function Login(props) {
    const {firebaseApp, firebaseProvider} = useContext(FirebaseContext);
    const {setToken, setUser} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        async function login() {
            await firebaseApp.auth().signInWithPopup(firebaseProvider)
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
                    console.error(error.message)
                })
        }

        login();
    }, [firebaseApp, setUser, setToken, history, firebaseProvider]);

    return (
        <div></div>
    );
}

export default Login;
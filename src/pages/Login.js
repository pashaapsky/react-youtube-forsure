import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {FirebaseContext} from "../context/FirebaseContext";

function Login(props) {
    const {firebaseApp, firebaseProvider} = useContext(FirebaseContext);
    const {login} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        async function loginHandler() {
            
            try {
                const result = await firebaseApp.auth().signInWithPopup(firebaseProvider);

                if (result) {
                    login(result.user, result.credential.accessToken);
                    history.push('/');
                }
            } catch (e) {
                console.error(e.message)
            }
        }

        loginHandler();
    }, [firebaseApp, firebaseProvider, history, login]);

    return (
        <div></div>
    );
}

export default Login;
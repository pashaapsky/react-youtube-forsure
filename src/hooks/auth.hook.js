import {useState, useEffect, useContext, useCallback} from 'react';
import {FirebaseContext} from "../context/FirebaseContext";

function useAuth(props) {
    const storageName = 'userData';

    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const {firebaseApp, firebaseProvider} = useContext(FirebaseContext);

    const login = useCallback((user, token) => {
        setToken(token);
        setUser(user);

        localStorage.setItem(storageName, JSON.stringify({
            user: user, token: token
        }))
    }, []);


    const logout = useCallback(() => {
        setToken(null);
        setUser(null);

        firebaseApp.auth().signOut()
            .catch(e => {
                console.error(e.message())
            });

        localStorage.removeItem(storageName);
    }, [firebaseApp]);

    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem(storageName));

        if (authData && authData.token) {
            login(authData.user, authData.token);
        }
    }, [login]);

    return {user, setUser, token, setToken, logout, login}
}

export default useAuth;
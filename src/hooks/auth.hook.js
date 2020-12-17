import {useState, useEffect, useContext, useCallback} from 'react';
import {useHistory} from 'react-router-dom'
import {FirebaseContext} from "../context/FirebaseContext";

function useAuth(props) {
    const storageName = 'userData';

    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const {firebaseApp, firebaseProvider} = useContext(FirebaseContext);

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
            setToken(authData.token);
            setUser(authData.user);
        }
    }, []);

    return {user, setUser, token, setToken, logout}
}

export default useAuth;
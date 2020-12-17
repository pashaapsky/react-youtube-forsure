import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {firebaseApp, firebaseProvider} from './configs/firebase'
import {FirebaseContext} from "./context/FirebaseContext";

ReactDOM.render(
    <FirebaseContext.Provider value={{
        firebaseApp, firebaseProvider
    }}>
        <App />
    </FirebaseContext.Provider>,
  document.getElementById('root')
);

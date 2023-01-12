import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import './index.css';


const firebaseConfig = {
    apiKey: "AIzaSyAtTsokm7Qrba-iyi7Xe26VU6JL-Fzmsug",
    authDomain: "dilienko-quiz.firebaseapp.com",
    projectId: "dilienko-quiz",
    storageBucket: "dilienko-quiz.appspot.com",
    messagingSenderId: "146177378437",
    appId: "1:146177378437:web:2cfa4f832a5aa156b641ec"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const database = getFirestore(app)


export const AppContext = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AppContext.Provider value={{
            auth, 
            database
        }}>
           <App /> 
        </AppContext.Provider>
    </BrowserRouter>
    
);

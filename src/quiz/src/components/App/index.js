import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../..";

import Home from "../../pages/Home";
import Layout from "../../pages/Layout";
import Login from "../../pages/Login";
import Profile from "../../pages/Profile";
import Registration from "../../pages/Registration";
import TestCreator from "../../pages/TestCreator";
import PrivatePoutes from "../../Routes/PrivateRoutes";
import PublicRoutes from "../../Routes/PublicRoutes";

import "./index.css";

function App() {
    const { auth } = useContext(AppContext);
    const [isAuth, setIsAuth] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setIsAuth(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                    path='login'
                    element={
                        <PublicRoutes isAuth={isAuth}>
                            <Login />
                        </PublicRoutes>
                    }
                />

                <Route
                    path='registration'
                    element={
                        <PublicRoutes isAuth={isAuth}>
                            <Registration />
                        </PublicRoutes>
                    }
                />

                <Route
                    path='profile'
                    element={
                        <PrivatePoutes isAuth={isAuth}>
                            <Profile />
                        </PrivatePoutes>
                    }
                />

                <Route
                    path='create-quiz'
                    element={
                        <PrivatePoutes isAuth={isAuth}>
                            <TestCreator />
                        </PrivatePoutes>
                    }
                />

                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    );
}

export default App;

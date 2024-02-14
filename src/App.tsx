import {ReactElement} from 'react';
import {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouteObject, RouterProvider, useNavigate} from 'react-router-dom';
import {onAuthStateChanged, User, getAuth} from 'firebase/auth';

import LandingPage from "./component/LandingPage.tsx";
import SignUp from "./component/Authentication/SignUp/SignUp.tsx";
import Login from "./component/Authentication/Login/Login.tsx";
import PasswordReset from "./component/Authentication/PasswordReset.tsx";
import WeatherIndex from "./component/Weather/WeatherIndex.tsx";
import store from "./store";
import {app} from './firebase';

const auth = getAuth(app);


function ProtectedRoute({element}: { element: ReactElement }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return isAuthenticated ? element : null;
}


const routes: RouteObject[] = [
    {
        element: <LandingPage/>,
        children: [
            {
                index: true,
                path: '/login',
                element: <Login/>
            }, {
                path: '/signup',
                element: <SignUp/>
            }, {
                path: '/password-reset',
                element: <PasswordReset/>
            }
        ]
    }, {
        path: '/',
        element: <ProtectedRoute element={<WeatherIndex/>}/>
    },
];

const router = createBrowserRouter(routes)

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}

export default App;

import React from 'react';
import AuthForm from '../AuthForm.tsx';
import useAuth from "../../../hooks/useAuth.tsx";

const Login: React.FC = () => {
const{handleLogin} = useAuth();

    return (
        <AuthForm
            title="Welcome Back"
            buttonText="Login"
            handleSubmit={handleLogin}
            linkTo="/signup"
            linkText="Don't have an account?"
        />
    );
};

export default Login;

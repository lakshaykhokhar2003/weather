import React from 'react';
import AuthForm from '../AuthForm';
import useAuth from "../../../hooks/useAuth.tsx";

const SignUp: React.FC = () => {
    const {handleSignUp} = useAuth();

    return (
        <AuthForm
            title="Welcome"
            buttonText="Sign Up"
            handleSubmit={handleSignUp}
            linkTo="/login"
            linkText="Already have an account?"
        />
    );
};

export default SignUp;

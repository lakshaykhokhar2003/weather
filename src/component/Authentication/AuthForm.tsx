import React from "react";
import {Link} from 'react-router-dom';
import {Typography} from '@mui/material';
import TextField from '@mui/material/TextField';
import {AuthFormProps} from '../../interfaces.ts';
import useAuth from '../../hooks/useAuth.tsx';
import {GoogleBtn} from '../../utils/GoogleBtn/GoogleBtn.tsx';
import {GithubBtn} from '../../utils/GithubBtn/GithubBtn.tsx';
import styles from './Login/Login.module.css';


const AuthForm: React.FC<AuthFormProps> = ({title, buttonText, handleSubmit, linkTo, linkText}) => {
    const {email, password, formErrors, handleInputChange} = useAuth();
    return (
        <div className={styles.Wrapper}>
            <div className={styles.Texts}>
                <Typography variant="h2" margin="normal" sx={{color: '#fffc9f'}} className={styles.Heading}>
                    {title}
                </Typography>
                <p>Login to continue...</p>
            </div>
            <div className={styles.Form}>
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    error={formErrors.email}
                    helperText={formErrors.email ? 'Email cannot be empty' : ''}
                    value={email}
                    onChange={handleInputChange}
                />
                <TextField
                    id="outlined-adornment-password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    error={formErrors.password}
                    helperText={formErrors.password ? 'Password cannot be empty' : ''}
                    value={password}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit} className={styles.Button}>
                    {buttonText}
                </button>
                {/*//Here we are using the buttonText prop to conditionally render the Forgot Password and Have an Account? links. If the buttonText is 'Login', we render the Forgot Password link, and if the buttonText is 'Sign Up', we render the Have an Account? link.//.*/}
                {buttonText === 'Login' ? <div className={styles.SignUp}>
                    <Typography variant="caption" margin="normal" className={styles.ForgotPassword}><Link
                        to="/password-reset">Forgot Password?</Link></Typography>
                    <Typography variant="caption" margin="normal" className={styles.HaveAcc}>
                        {linkText} <Link
                        to={linkTo}>{linkText === 'Already have an account?' ? 'Login' : 'Sign Up'}</Link>
                    </Typography>
                </div> : <div className={styles.SignUp}>
                    <Typography variant="caption" margin="normal" className={styles.HaveAcc}>
                        {linkText} <Link
                        to={linkTo}>{linkText === 'Already have an account?' ? 'Login' : 'Sign Up'}</Link>
                    </Typography>
                </div>}
                <p className={styles.Divider}>or</p>
                <GoogleBtn/>
                <GithubBtn/>
            </div>
        </div>
    );
};

export default AuthForm;
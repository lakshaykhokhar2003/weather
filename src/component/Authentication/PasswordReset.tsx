import {useState} from "react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.tsx";
import {Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./Login/Login.module.css";

const PasswordReset = () => {
    const {formErrors, handleResetPassword} = useAuth();
    const [email, setEmail] = useState('');
    return (
        <div className={styles.Wrapper}>
            <div className={styles.Texts}>
                <Typography variant="h2" margin="normal" sx={{color: '#fffc9f'}} className={styles.Heading}>
                    Password Reset</Typography>
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
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={() => handleResetPassword(email)} className={styles.Button}>
                    Reset Password
                </button>

                <div className={styles.SignUp}>
                    <Typography variant="caption" margin="normal" className={styles.HaveAcc}>
                        Already have an account <Link
                        to="/login">Login</Link>
                    </Typography>
                    <Typography variant="caption" margin="normal" className={styles.HaveAcc}>
                        Don't have an account? <Link
                        to="/signup">Sign up</Link>
                    </Typography>
                </div>

            </div>
        </div>);
}

export default PasswordReset;
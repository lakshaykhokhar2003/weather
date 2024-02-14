import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import useUsers from "../../hooks/useUsers.tsx";
import {RootState} from "../../interfaces.ts";
import {Avatar, IconButton, Menu, MenuItem} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleIcon from '@mui/icons-material/Circle';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app} from "../../firebase.ts";
import styles from './User.module.css';

const auth = getAuth(app);

const User: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.users.currentUser);
    const {anchorEl, handleMenuClick, handleClose, LogoutUser, changeUserStatus} = useUsers()
    const [user, setUser] = useState<string | null>(null);
    const [photoURL, setPhotoURL] = useState<string | null>(null);

    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.email === null || undefined) {
                    setUser(user.displayName);
                } else setUser(user.email);

                if (user.photoURL === null) {
                    setPhotoURL(null);
                } else setPhotoURL(user.photoURL);

            } else {
                setUser(null);
            }
        });
    }, [photoURL]);


    return (
        <div className={styles.ProfileIcon}>
            <IconButton
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
            >
                {photoURL ? <Avatar alt="User" src={photoURL}/> : <AccountCircleIcon fontSize="large"/>}
                <CircleIcon className={styles.icon} fontSize="small"
                            sx={{color: currentUser?.status === 'offline' ? 'rgba(255,255,255,0.37)' : '#54ff4e'}}/>
            </IconButton>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem disabled>{user}</MenuItem>
                <MenuItem
                    onClick={changeUserStatus}>Go {currentUser?.status === 'offline' ? 'Online' : 'Offline'}</MenuItem>
                <MenuItem onClick={LogoutUser}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default User;

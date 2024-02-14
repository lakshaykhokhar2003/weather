import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../interfaces.ts";
import useUsers from "../../hooks/useUsers.tsx";
import CloseIcon from '@mui/icons-material/Close';
import {Button, List, ListItem, ListItemText} from '@mui/material';
import CircleIcon from "@mui/icons-material/Circle";
import styles from './User.module.css';

const UsersList: React.FC = () => {
    const {sortByOnline, showAllUser, handleShowAllUsers, SortBy} = useUsers()
    const users = useSelector((state: RootState) => state.users.list)

    const Click = () => {
        handleShowAllUsers();
        SortBy()
    }
    return (
        <div className={styles.UserList}>
            {showAllUser ?
                <span onClick={Click} className={styles.DisplayText}>All Users</span> :
                <div className={styles.Users}>
                    <Button onClick={SortBy} variant="text" className={styles.Button}
                            sx={{color: "white", textShadow: "10px 1px 0 rgba(0, 100, 0, 0.1)"}}>
                        Sort by {sortByOnline ? 'Offline' : 'Online'}
                    </Button>
                    <CloseIcon className={styles.Close} onClick={handleShowAllUsers}/>
                    <List>
                        {users.map((user) => (
                            <ListItem key={user.id}>
                                <ListItemText primary={user.name}/>
                                <CircleIcon className={styles.icon} fontSize="small"
                                            sx={{color: user.status === 'offline' ? 'rgba(255,255,255,0.37)' : '#54ff4e'}}/>
                            </ListItem>
                        ))}
                    </List>
                </div>}
        </div>
    );
};

export default UsersList;

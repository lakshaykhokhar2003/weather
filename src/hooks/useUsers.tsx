import React, {useEffect, useState} from "react";
import {getAuth, signOut} from "firebase/auth";
import useAuth from "./useAuth.tsx";
import {app} from "../firebase.ts";
import {collection, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import {RootState, User, valueProps} from "../interfaces.ts";
import {useDispatch, useSelector} from "react-redux";
import {usersActions} from "../store/users.ts";
import {weatherActions} from "../store/weather.ts";

const auth = getAuth(app);
const db = getFirestore(app);
const useUsers = () => {
    const {updateUserStatus} = useAuth();
    const dispatch = useDispatch();

    const currentUser = useSelector((state: RootState) => state.users.currentUser);

    const [sortByOnline, setSortByOnline] = useState<boolean>(false);
    const [showAllUser, setAllUser] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const currentUserEmail = (auth.currentUser?.email ? auth.currentUser.email : auth.currentUser?.displayName) as string;

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const SortBy = () => {
        setSortByOnline((prevSortByOnline) => !prevSortByOnline);
    };

    const handleShowAllUsers = () => {
        setAllUser((prevShowAll) => !prevShowAll);
    }
    const fetchUsers = async () => {
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('status', '==', sortByOnline ? 'active' : 'offline'));
        const querySnapshot = await getDocs(q);
        const usersData: User[] = [];
        querySnapshot.forEach((doc) => {
            const userData = {id: doc.id, ...doc.data()} as User;
            usersData.push(userData);
        })
        dispatch(usersActions.updateUsersList(usersData));
    }

    const LogoutUser = async () => {
        await updateUserStatus(currentUserEmail, 'offline');
        dispatch(usersActions.clearUsers());
        dispatch(weatherActions.clearWeather());
        await signOut(auth);
        handleClose();
    };

    const goOnline = async () => {
        await updateUserStatus(currentUserEmail, 'active');
        dispatch(usersActions.updateCurrentUser({...currentUser, status: 'active'}));
        handleClose();
    };

    const goOffline = async () => {
        await updateUserStatus(currentUserEmail, 'offline');
        dispatch(usersActions.updateCurrentUser({...currentUser, status: 'offline'}));
        handleClose();
    };

    const changeUserStatus = async () => {
        if (currentUser?.status === 'offline') {
            await goOnline();
        } else {
            await goOffline();
        }
    }

    const defaultWeather = async (value: valueProps) => {
        const q = query(collection(db, 'users'), where('name', '==', currentUserEmail));
        const userSnapshot = await getDocs(q);
        userSnapshot.forEach((doc) => {
            updateDoc(doc.ref, {weatherDefault: value});
        });
        const updatedUser = {...currentUser, weatherDefault: value}
        dispatch(usersActions.updateCurrentUser(updatedUser));
        dispatch(weatherActions.updateCity(value));
    };


    useEffect(() => {
        fetchUsers();
    }, [sortByOnline, currentUser?.status]);

    return {
        handleMenuClick,
        changeUserStatus,
        handleClose,
        LogoutUser,
        goOnline,
        goOffline,
        SortBy,
        handleShowAllUsers,
        defaultWeather,
        showAllUser,
        anchorEl,
        sortByOnline,
    };
}

export default useUsers;
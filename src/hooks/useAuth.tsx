import {ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
    sendPasswordResetEmail, GoogleAuthProvider, GithubAuthProvider,
} from "firebase/auth";
import {getFirestore, collection, addDoc, query, where, getDocs, updateDoc} from "firebase/firestore";
import {app} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import {formActions} from "../store/form.ts";
import {RootState} from "../interfaces.ts";
import {usersActions} from "../store/users.ts";
import useWeather from "./useWeather.tsx";
import {weatherActions} from "../store/weather.ts";

const db = getFirestore(app)
const auth = getAuth(app)


const useAuth = () => {
    const {getWeather, getHourlyWeather} = useWeather()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const email = useSelector((state: RootState) => state.form.data.email);
    const password = useSelector((state: RootState) => state.form.data.password);
    const formErrors = useSelector((state: RootState) => state.form.error);

    const trimmedEmail = (email as string).trim()
    const trimmedPassword = (password as string).trim()

    const updateUserStatus = async (email: string | null, status: 'active' | 'offline') => {
        if (email) {
            const q = query(collection(db, 'users'), where('name', '==', email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {status});
            });
        }
    };

    const createUser = async (email: string | null) => {
        const q = query(collection(db, 'users'), where('name', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            await addDoc(collection(db, 'users'), {
                name: email,
                status: 'active',
                weatherDefault: {
                    name: "Mumbai", countryCod: "IN",
                    stateCode: "MH",
                    latitude: 19.07283,
                    longitude: 72.88261,
                    id: 2626
                }
            });
        } else await updateUserStatus(email, 'active');

        await fetchUserDetails(email)

    }

    const fetchUserDetails = async (email: string | null) => {
        const q = query(collection(db, 'users'), where('name', '==', email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dispatch(usersActions.updateCurrentUser(doc.data()))
            const {weatherDefault} = doc.data()
            dispatch(weatherActions.updateCity(weatherDefault));
            getWeather(weatherDefault.longitude, weatherDefault.latitude);
            getHourlyWeather(weatherDefault.longitude, weatherDefault.latitude)
        });
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        dispatch(formActions.updateForm({name, value}));
        dispatch(formActions.updateError({
            ...formErrors,
            [name]: false
        }));
    };

    const handleLogin = async () => {
        if (trimmedEmail === '' && trimmedPassword === '') {
            return dispatch(formActions.updateError({email: true, password: true}))
        } else if (trimmedEmail === '') {
            return dispatch(formActions.updateError({email: true}))
        } else if (trimmedPassword === '') {
            return dispatch(formActions.updateError({password: true}))
        }
        try {
            const response = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
            navigate('/')
            await createUser(response.user.email ? response.user.email : response.user.displayName)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
    };


    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const response = await signInWithPopup(auth, provider);
            navigate('/');
            await createUser(response.user.email ? response.user.email : response.user.displayName)

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
    };
    const signInWithGithub = async () => {
        try {
            const provider = new GithubAuthProvider()
            const response = await signInWithPopup(auth, provider)
            navigate('/')
            await createUser(response.user.email ? response.user.email : response.user.displayName)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("An unknown error occurred");
            }
        }
    }

    const handleSignUp = async () => {
        if (trimmedEmail === '' || trimmedPassword === '') {
            return dispatch(formActions.updateError({email: true, password: true}));
        }
        try {
            const response = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword)
            navigate('/')
            await createUser(response.user.email ? response.user.email : response.user.displayName)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message, error);
            } else {
                console.log("An unknown error occurred", error);
            }
        }
    }

    const handleResetPassword = async (email: string) => {
        if (email === '') return dispatch(formActions.updateError({email: true}))
        try {
            await sendPasswordResetEmail(auth, email)
            console.log('Password reset email sent successfully')
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message, error);
            } else {
                console.log("An unknown error occurred", error);
            }
        }
    }


    return {
        auth,
        email,
        password,
        formErrors,
        handleInputChange,
        handleLogin,
        signInWithGoogle,
        signInWithGithub,
        handleSignUp,
        handleResetPassword,
        updateUserStatus
    };
}

export default useAuth
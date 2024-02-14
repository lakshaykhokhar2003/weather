import {ICity} from "country-state-city";
import {combineReducers} from "@reduxjs/toolkit";
import formReducer from "./store/form.ts";
import weatherReducer from "./store/weather.ts";
import usersReducer from "./store/users.ts";

export interface valueProps {
    latitude: number;
    longitude: number;
    id: number;
    name: string;
    countryCode: string;
    stateCode: string;

    getAllCities?(): ICity[];

    getCitiesOfState?(): ICity[];

    getCitiesOfCountry?(): ICity[];
}

export interface cityProps {
    name: string;
    stateCode: string;
    latitude: number;
    longitude: number;
}

export interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface NextWeatherData {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
}


export interface FormData {
    data: {
        email: string;
        password: string;
    },
    error: {
        email: boolean;
        password: boolean;
    }
}

export interface AuthFormProps {
    title: string;
    buttonText: string;
    handleSubmit: () => void;
    linkTo: string;
    linkText: string;
}

export interface User {
    id?: string;
    name: string;
    status: string;
    weatherDefault: valueProps;
}


export const rootReducer = combineReducers({
    form: formReducer,
    weather: weatherReducer,
    users: usersReducer

});

export type RootState = ReturnType<typeof rootReducer>;
import React, {useLayoutEffect, useState} from "react";
import {City, ICity} from "country-state-city";
import {useDispatch} from "react-redux";
import {weatherActions} from "../store/weather.ts";
import {AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/material";
import useWeather from "./useWeather.tsx";
import {valueProps} from "../interfaces.ts";

const useCity = () => {
    const {getWeather, getHourlyWeather} = useWeather();
    const [data, setData] = useState<ICity[]>([]);
    const dispatch = useDispatch()


    useLayoutEffect(() => {
        const fetchData = () => {
            const cities = City.getCitiesOfCountry('IN');

            if (cities) {
                setData(cities);
            }
        };
        fetchData();
    }, []);

    const handleSelect = async (_event: React.SyntheticEvent<Element, Event>, value: valueProps | null | AutocompleteChangeReason | AutocompleteChangeDetails<string> | undefined) => {
        if (value === null || value === undefined) {
            return;
        }
        dispatch(weatherActions.updateHourlyWeather([]))
        console.log(value)
        const selectedValue = value as valueProps;
        dispatch(weatherActions.updateCity(selectedValue));
        await getWeather(selectedValue.longitude, selectedValue.latitude);
        await getHourlyWeather(selectedValue.longitude, selectedValue.latitude)
    }


    const modifyData = (data: ICity[]) => {
        return data.map((city, index) => {
            return {
                ...city,
                latitude: Number(city.latitude),
                longitude: Number(city.longitude),
                id: index
            }
        })
    }

    const newData = modifyData(data)


    return {
        newData,
        handleSelect
    }
}

export default useCity
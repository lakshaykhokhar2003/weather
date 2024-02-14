import axios from 'axios';
import {useDispatch} from "react-redux";
import {weatherActions} from "../store/weather.ts";
import {NextWeatherData} from "../interfaces.ts";


const useWeather = () => {
    const dispatch = useDispatch()
    const apiKey = import.meta.env.VITE_API_KEY
    const currentDate = new Date();

    const getWeather = async (lon: number, lat: number) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            dispatch(weatherActions.updateWeather(response.data))
        } catch (e) {
            console.log(e)
        }
    }

    const getHourlyWeather = async (lon: number, lat: number) => {
        try {
            const response = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            const filteredData = response.data.list.filter((data: NextWeatherData) => {
                const dtTxtDate = new Date(data.dt_txt);
                return dtTxtDate > currentDate;
            });
            const slicedData = filteredData.slice(0, 5);
            dispatch(weatherActions.updateHourlyWeather(slicedData))
        } catch (e) {
            console.log(e)
        }
    }


    return {getWeather, getHourlyWeather}
}

export default useWeather;
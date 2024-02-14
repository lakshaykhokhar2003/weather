import {useSelector} from "react-redux";
import {cityProps, RootState, WeatherData} from "../../../interfaces.ts";

import WindPowerTwoToneIcon from '@mui/icons-material/WindPowerTwoTone';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import SpeedIcon from '@mui/icons-material/Speed';
import {capitalize} from "../../../utils/functions.ts";
import styles from "./WeatherDetails.module.css";

const WeatherDetails = () => {
    const city = useSelector((state: RootState) => state.weather.city);
    const currentWeather = useSelector((state: RootState) => state.weather.currentWeather);

    const {name} = city as cityProps;
    const {main, weather, wind} = currentWeather as WeatherData;
    const {temp, humidity, pressure,} = main || 0;
    const {speed} = wind
    const {description} = weather[0];

    return <>
        <div className={styles.WeatherInfo}>
            <h2>{name}</h2>
            <h1>{Math.round(temp)} °C</h1>
            <h3>{capitalize(description)}</h3>
            <div className={styles.ExtraInfo}>
                <p><WindPowerTwoToneIcon/> {speed} m/s </p>
                <p><WaterDropTwoToneIcon/> {humidity} %</p>
                <p><SpeedIcon/>{pressure} hPa</p>
            </div>
        </div>
    </>
}

export default WeatherDetails
import {useSelector} from "react-redux";
import {NextWeatherData, RootState} from "../../../interfaces.ts";
import styles from "./NextWeather.module.css";
import {capitalize, getHours} from "../../../utils/functions.ts";

const NextWeather = () => {
    const hourlyWeather = useSelector((state: RootState) => state.weather.hourlyWeather);

    let content
    if (hourlyWeather.length > 0) {
        content = hourlyWeather.map((weather: NextWeatherData, index: number) => {
            return (
                <div key={index} className={styles.Card}>
                    <p className={styles.Temp}>{Math.round(weather.main.temp)} <sup>°C</sup></p>
                    <p>{getHours(weather.dt_txt)}</p>
                    <p>{capitalize(weather.weather[0].description)}</p>
                </div>
            );
        })
    } else {
        content = <p>No data</p>
    }

    return <div className={styles.NextWeather}>
        {content}
    </div>
}

export default NextWeather
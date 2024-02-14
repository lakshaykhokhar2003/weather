import {useSelector} from "react-redux";
import {RootState} from "../../interfaces.ts";
import WeatherDetails from "./WeatherDetails/WeatherDetails.tsx"
import SearchBar from "./SearchBar/SearchBar.tsx";
import NextWeather from "./NextWeather/NextWeather.tsx";
import User from "../User/User.tsx";
import UsersList from "../User/UsersList.tsx";
import Loading from "../../utils/loader/Loading.tsx";
import GetDate from "../../utils/Date/GetDate.tsx";
import styles from './WeatherIndex.module.css';


const WeatherIndex = () => {
    const currentWeather = useSelector((state: RootState) => state.weather.currentWeather);
    const NextWeatherData = useSelector((state: RootState) => state.weather.hourlyWeather);
    return (
        <div className={styles.WeatherWrap}>
            <div className={styles.imageWrap}>
                <img src="/clouds.jpg" alt="" className={styles.imageBg}/>
            </div>
            <User/>
            <UsersList/>
            <SearchBar/>
            {Object.keys(currentWeather).length > 0 && <>
                <WeatherDetails/>
                {NextWeatherData.length > 0 ? <NextWeather/> : <Loading/>}
            </>}
            <GetDate/>
        </div>
    );
};

export default WeatherIndex;

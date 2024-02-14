import {useState, useEffect} from 'react';
import styles from "./GetDate.module.css";

const GetDate = () => {
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekDay: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const getCurrentTime = (): string => {
        const now: Date = new Date();
        const day: string = weekDay[now.getDay()];
        const month: string = months[now.getMonth()];
        const date: number = now.getDate();
        let hours: number | string = now.getHours();
        let min: number | string = now.getMinutes();
        const sec: number = now.getSeconds()
        let format: string = "AM";

        if (hours > 11) {
            format = "PM";
            if (hours > 12) hours -= 12;
        }
        if (min < 10) min = "0" + min;

        return `${day} | ${date} ${month} | ${hours}:${min}:${sec} ${format}`;
    }

    const [time, setTime] = useState<string>(getCurrentTime());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = getCurrentTime();
            setTime(currentTime);
        }, 1);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.Date}>
            <h1>{time}</h1>
        </div>
    );
}

export default GetDate;

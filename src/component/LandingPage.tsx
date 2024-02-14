import {Outlet} from "react-router-dom";
import VideoBackground from "../utils/Video/VideoBackground.tsx";
import styles from './LandingPage.module.css'

const LandingPage = () => {
    return <div className={styles.VideoForm}>
        <VideoBackground/>
        <Outlet/>
    </div>
}

export default LandingPage
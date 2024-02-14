import GetDate from "../Date/GetDate.tsx";
import styles from './VideoBackground.module.css';

const VideoBackground = () => {
    return (
        <div className={styles.videoWrap}>
            <video id={styles.videoBg} autoPlay muted loop>
                <source
                    src="./running.mp4"
                    type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <GetDate/>
        </div>
    );
};

export default VideoBackground;

import styles from './Loading.module.css';
const Loading = () => {
    return (
        <div className={styles["terminal-loader"]}>
            <div className={styles["terminal-header"]}>
                <div className={styles["terminal-title"]}>Status</div>
                <div className={styles["terminal-controls"]}>
                    <div className={`${styles["control"]} ${styles["close"]}`}></div>
                    <div className={`${styles["control"]} ${styles["minimize"]}`}></div>
                    <div className={`${styles["control"]} ${styles["maximize"]}`}></div>
                </div>
            </div>
            <div className={styles["text"]}>Loading...</div>
        </div>
    );
}

export default Loading;
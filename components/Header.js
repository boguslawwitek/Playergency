import styles from '../styles/Header.module.scss';

export default function Header() {
    return (
        <header>
            <div className={styles.wave}>
                <h1>Playergency</h1>
                <h2>Masz dość gry w samotności? Dołącz do naszej społeczności.</h2>
                <img className={styles.wave_img} src="/red_wave.svg" alt="" />
            </div>
        </header>
    )
  }
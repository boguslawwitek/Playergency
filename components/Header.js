import styles from '../styles/Header.module.scss';
import { useTranslation } from 'next-i18next';

const Header = () => {
    const { t } = useTranslation('common');

    return (
        <header>
            <div className={styles.wave}>
                <h1>{t('header-title')}</h1>
                <h2>{t('header-desc')}</h2>
                <img className={styles.wave_img} src="/images/red_wave.svg" alt="" />
            </div>
        </header>
    )
}

export default Header;
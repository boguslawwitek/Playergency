import styles from '../styles/LanguageSwitch.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitch = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (

        <div className={styles.language}>
            <Link href={router.pathname} locale={router.locale = 'pl'}>
                <div className={styles['language-box']}>
                    <img className={styles['lang-img']} src={`/images/flags/pl.png`} />
                    <div className={styles.text}>PL</div>
                </div>
            </Link>
            <Link href={router.pathname} locale={router.locale = 'en'}>
                <div className={styles['language-box']}>
                    <img className={styles['lang-img']} src={`/images/flags/en.png`} />
                    <div className={styles.text}>EN</div>
                </div>
             </Link>
        </div>
    )
}

export default LanguageSwitch;
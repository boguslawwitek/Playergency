import styles from '../styles/LanguageSwitch.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitch = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <Link href={router.pathname} locale={router.locale === 'pl' ? 'en' : 'pl'}>
            <div className={styles.language}>
                <div>{t('lang-select')}</div>
                <div className={styles['language-box']}>
                    <img className={styles['lang-img']} src={`/images/flags/${t('lang')}.png`} />
                    <div>{t('lang-long')}</div>
                </div>
            </div>
        </Link>
    )
}

export default LanguageSwitch;
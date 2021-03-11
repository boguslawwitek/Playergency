import React, { useEffect, useState } from 'react';
import styles from '../styles/Cookies.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import classNames from 'classnames';

const CookiesBanner = () => {
    const { t } = useTranslation('policy');
    const [isVisible, setIsVisible] = useState(false);

    function cookiesParse() {
        return Object.fromEntries(document.cookie.split(/; */).map(c => {
            const [ key, v ] = c.split('=', 2);
            return [ key, decodeURIComponent(v) ];
        }));
    }

    useEffect(() => {
        const cookies = cookiesParse();

        if(!document.cookie || !cookies.hasOwnProperty('cookiesConfirm')) {
            document.cookie = "cookiesConfirm=false;expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/";
            setIsVisible(prevState => prevState = true);
        }

        if(cookies.hasOwnProperty('cookiesConfirm') && cookies['cookiesConfirm'] === "true") {
            setIsVisible(prevState => prevState = false);
        }
    }, [])

    function handleBtn() {
        const cookies = cookiesParse();
        if(cookies.hasOwnProperty('cookiesConfirm') && cookies['cookiesConfirm'] === "false") {
            document.cookie = "cookiesConfirm=true;expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/";
            setIsVisible(prevState => prevState = false);
        }
    }

    return (
        <div className={classNames(styles.cookies, isVisible ? null : styles.hide)}>
            <div className={styles.container}>
                <div className={styles.text}>{t('cookies-info')}</div>
                <div className={styles.buttons}>
                    <button onClick={handleBtn} className={classNames(styles.btn, styles.accept)}>{t('cookies-accept')}</button>
                    <Link href="/privacy-policy">
                        <a className={classNames(styles.btn, styles['more-info'])}>{t('cookies-moreinfo')}</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CookiesBanner;
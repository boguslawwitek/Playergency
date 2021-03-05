import React, { useState, useEffect } from 'react';
import styles from '../styles/Nav.module.scss';
import { useTranslation } from 'next-i18next';
import HamburgerBtn from './HamburgerBtn';
import classNames from 'classnames';
import Link from 'next/link';

export const Nav = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [innerWidth, setInnerWidth] = useState(0);
    const { t } = useTranslation('common');

    useEffect(() => {
        setInnerWidth(prevState => prevState = window.innerWidth);

        function handleResize() {
            setInnerWidth(prevState => prevState = window.innerWidth);
        }
    
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const NavList = () => (
        <ul className={styles.ul}>
            <li className={styles.li}>
                <Link href="/"><a className={styles.a}>{t('nav-home')}</a></Link>
            </li>
            <li className={styles.li}>
                <a href="https://www.playergency.com/beta/" className={styles.a}>{t('nav-dashboard')}</a>
            </li>
            <li className={styles.li}>
                <a href="https://www.playergency.com/beta/ranking" className={styles.a}>Ranking</a>
            </li>
            <li className={styles.li}>
                <a href="https://www.playergency.com/beta/shop" className={styles.a}>{t('nav-store')}</a>
            </li>
            <li className={styles.li}>
                <a href="https://discord.com/invite/RgnA9rS" target="_blank" className={styles.a}>Discord</a>
            </li>
        </ul>
    )

    return (
        <nav>
            <div className={styles.navigation}>
                <HamburgerBtn menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} customStyle={styles.hamburger} />
                <Link href="/"><a className={classNames(styles.logo, styles.a)}><div className={styles['img-container']}><img className={styles['logo-img']} src="/images/logo.png" alt="Playergency Logo" /></div><span className={styles['logo-text']}>Playergency.com</span></a></Link>
                {innerWidth > 1024 ? <NavList /> : null}
            </div>
            {innerWidth < 1024 && menuIsOpen ? <NavList /> : null}
        </nav>
    )
}

export default Nav;
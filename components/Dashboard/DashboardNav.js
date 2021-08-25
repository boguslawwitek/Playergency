import React, { useState } from 'react';
import styles from '../../styles/DashboardNav.module.scss';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faMedal, faShoppingBasket, faCog } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export const DashboardNav = ({userData, children}) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [adminDropDown, setAdminDropDown] = useState(false);

    function handleDropDown() {
        setAdminDropDown(prev => prev = !prev);
    }

    function handleLogout() {
        window.location = ('/api/logout');
    }

    return (<>
        <div className={styles.container}>
            <div className={styles.user}>
            <Link href="/"><a className={styles.link}>
                <div className={styles.profile}>
                    <img className={styles.avatar} src={userData.user.avatar} alt="" />
                    <div>
                        <div className={styles.tag}>{userData.user.tag}</div>
                        <div className={styles['your-profile']}>Twój profil</div>
                    </div>
                </div>
            </a></Link>
            <button className={styles.logoutBtn} onClick={handleLogout}>Wyloguj</button>
            </div>
            <div className={styles['content-container']}>
                <nav>
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <Link href="/dashboard"><a className={classNames(styles.link, router.pathname == "/dashboard" ? styles.active : null)}><FontAwesomeIcon icon={faUserFriends} className={styles.icons}/>Role</a></Link>
                        </li>
                        <li className={styles.li}>
                            <Link href="/"><a className={styles.link}><FontAwesomeIcon icon={faMedal} className={styles.icons}/>Ranking</a></Link>
                        </li>
                        <li className={styles.li}>
                            <Link href="/"><a className={styles.link}><FontAwesomeIcon icon={faShoppingBasket} className={styles.icons}/>Sklep</a></Link>
                        </li>
                        <li className={styles.li}>
                            <button onClick={handleDropDown} className={classNames(styles.adminBtn, styles.link)}><FontAwesomeIcon icon={faCog} className={styles.icons}/>Admin</button>
                        </li>
                        {adminDropDown ? 
                        <ul className={styles['second-ul']}>
                            <li className={styles.li}>
                                <Link href="/"><a className={styles.link}>Role</a></Link>
                            </li>
                            <li className={styles.li}>
                                <Link href="/"><a className={styles.link}>Sklep</a></Link>
                            </li>
                            <li className={styles.li}>
                                <Link href="/"><a className={styles.link}>Ustawienia</a></Link>
                            </li>     
                            <li className={styles.li}>
                                <Link href="/"><a className={styles.link}>Statystyki</a></Link>
                            </li>           
                        </ul>
                        : null}
                    </ul>
                </nav>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    </>)
}

DashboardNav.propTypes = {
    children: PropTypes.element.isRequired,
    userData: PropTypes.object
};

export default DashboardNav;
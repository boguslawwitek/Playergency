import React from 'react';
import PropTypes from 'prop-types';
import useSwr from 'swr';
import styles from '../styles/Footer.module.scss';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LanguageSwitch from './LanguageSwitch';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Footer = ({path}) => {
    const { t } = useTranslation('common');
    const { data, error } = useSwr('/api/year', fetcher);

    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <div className={styles.container}>
                    <ul className={styles['links-list']}>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'discord']} className={styles.icons}/>
                                <a href="https://discord.gg/85cV6Et" target="_blank">Discord</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'facebook']} className={styles.icons}/>
                                <a href="https://www.facebook.com/Playergency/" target="_blank">Facebook</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'twitter']} className={styles.icons}/>
                                <a href="https://twitter.com/playergency" target="_blank">Twitter</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'facebook']} className={styles.icons} />
                                <a href="https://www.facebook.com/groups/playergency" target="_blank">{t('footer-fb-group')}</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'steam']} className={styles.icons}/>
                                <a href="https://steamcommunity.com/groups/playergency" target="_blank">{t('footer-steam-group')}</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'spotify']} className={styles.icons}/>
                                <a href="https://spoti.fi/2H6ixr5" target="_blank">Spotify</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'youtube']} className={styles.icons} />
                                <a href="https://www.youtube.com/channel/UCVc-2YValRpTkBl5yElyCgQ" target="_blank">YouTube</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon={['fab', 'twitch']} className={styles.icons}/>
                                <a href="https://www.twitch.tv/playergency" target="_blank">Twitch</a>
                            </div>
                        </li>
                        <li>
                            <div className={styles['link-container']}>
                                <FontAwesomeIcon icon="hands-helping" className={styles.icons} />
                                <a href="https://patronite.pl/playergency" target="_blank">Patronite</a>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <LanguageSwitch path={path} />
                    </div>
                </div> 
            </div>
            <div className={styles.copyright}>
                <div className={styles.container}>
                    <p>&copy; 2016-{error || !data ? '2021' : data.year} Playergency. {t('footer-copyright')}</p>
                    <p>{t('footer-author')} <a href="https://bwitek.dev" target="_blank" className={styles.author}>BWitek.dev</a></p>
                </div> 
            </div>
        </footer>
    )
}

Footer.propTypes = {
    path: PropTypes.string
};

export default Footer;
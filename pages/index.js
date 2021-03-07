import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import classNames from 'classnames';

import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Home = () => {
  const { t } = useTranslation('common');
  const [membersCount, setMembersCount] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(prevState => prevState = window.innerWidth);

    function handleResize() {
      setInnerWidth(prevState => prevState = window.innerWidth);
    }

    fetch("https://discord.com/api/guilds/242347815563427840/widget.json")
      .then(res => res.json())
      .then(json => setMembersCount(prevState => prevState = json.presence_count));
  
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [])

  return (
    <>
      <Head>
        <title>Playergency</title>
        <link rel="icon" href="/images/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      <Nav innerWidth={innerWidth} />
      <Header />
      <main>
        <section className={styles.section1}>
          <p>{t('home:section1-p')}</p>
          <a href="#" className={styles.btn}>
            {membersCount ? t('home:section1-btn-with-count', {membersCount}) : t('home:section1-btn')}
          </a>
        </section>
        <section className={styles.section2}>
          <h3 className={styles.piority}>{t('home:section2-title')}</h3>
          <img className={styles['section-img']} src="/images/games/gta.png" alt="" />
          <h4 className={classNames(styles.h4, styles.point1)}>{t('home:section2-desc')}</h4>
          <div className={styles.features}>{t('home:section2-features')}</div>
          <div className={styles['info-container']}>
            <img className={classNames(styles['section-img'], styles['csgo-img'])} src="/images/games/csgo.png" alt="" />
            <h4 className={styles.h4}>{t('home:section2-point1')}</h4>
          </div>
          <div className={styles['info-container']}>
            {innerWidth <= 800 ? <img className={classNames(styles['section-img'], styles['lol-img'])} src="/images/games/lol.png" alt="" /> : null}
            <div>
              <h4 className={classNames(styles.h4, styles.activity)}>{t('home:section2-point2')}</h4>
              <p className={styles.additional}>{t('home:section2-point2-a')}</p>
            </div>
            {innerWidth > 800 ? <img className={classNames(styles['section-img'], styles['lol-img'])} src="/images/games/lol.png" alt="" /> : null}
          </div>
          <div className={styles['info-container']}>
            <img className={classNames(styles['section-img'], styles['mc-img'])} src="/images/games/minecraft.png" alt="" />
            <h4 className={styles.h4}>{t('home:section2-point3')}</h4>
          </div>
        </section>
        <section className={styles.section3}>
          <div className={styles.administration}>{t('admins:title')}</div>
          <div className={styles.admins}>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin1-name')}</div>
                <div className={styles.role}>{t('admins:admin1-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin1-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin2-name')}</div>
                <div className={styles.role}>{t('admins:admin2-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin2-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin3-name')}</div>
                <div className={styles.role}>{t('admins:admin3-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin3-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin4-name')}</div>
                <div className={styles.role}>{t('admins:admin4-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin4-desc')}</p>
            </div>
            <div className={styles.admin}>
              <div>
                <div className={styles.username}>{t('admins:admin5-name')}</div>
                <div className={styles.role}>{t('admins:admin5-role')}</div> 
              </div>
              <p className={styles['admin-desc']}>{t('admins:admin5-desc')}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home', 'admins']),
  },
})

export default Home;
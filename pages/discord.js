import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Discord.module.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookiesBanner from '../components/CookiesBanner';
import { umamiAnalyticsID, umamiAnalyticsSrc } from '../config.json';

const Discord = () => {
  const { t } = useTranslation('common');
  const [innerWidth, setInnerWidth] = useState(0);

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

  return (
    <>
      <Head>
        <title>Playergency - Discord</title>
        <link rel="icon" href="/images/favicon.ico" />
        <style>{dom.css()}</style>
        {umamiAnalyticsID && umamiAnalyticsSrc ? 
        <script async defer data-website-id={umamiAnalyticsID} src={umamiAnalyticsSrc}>
        </script> : null}

        {/* <!-- Primary Meta Tags --> */}
        <meta name="title" content="Playergency - Discord" />
        <meta name="description" content={t('meta-desc-discord')} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://playergency.com/discord" />
        <meta property="og:title" content="Playergency - Discord" />
        <meta property="og:description" content={t('meta-desc-discord')} />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://playergency.com/discord" />
        <meta property="twitter:title" content="Playergency - Discord" />
        <meta property="twitter:description" content={t('meta-desc-discord')} />
      </Head>
      <Nav innerWidth={innerWidth} />
      <main className={styles.main}>
        <div className={styles.box}>
            <img className={styles.logo} src="/images/logo.png" alt="" />
            <h1 className={styles.h1}>Playergency</h1>
            <p className={styles.p}>{t('discord-p')}</p>
            <a href="https://discord.gg/85cV6Et" className={styles.link}><FontAwesomeIcon className={styles['discord-icon']} icon={['fab', 'discord']} />{t('discord-join')}</a>
        </div>
      </main>
      <Footer />
      <CookiesBanner />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home', 'policy']),
  },
})

export default Discord;
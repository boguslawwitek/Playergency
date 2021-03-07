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
        <title>Playergency</title>
        <link rel="icon" href="/images/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      <Nav innerWidth={innerWidth} />
      <main className={styles.main}>
        <div className={styles.box}>
            <img className={styles.logo} src="/images/logo.png" alt="" />
            <h1 className={styles.h1}>Playergency</h1>
            <p className={styles.p}>{t('discord-p')}</p>
            <a href="https://discord.gg/85cV6Et" className={styles.link}><FontAwesomeIcon className={styles['discord-icon']} icon={['fab', 'discord']} />Dołącz</a>
        </div>
      </main>
      <Footer path="/discord" />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home']),
  },
})

export default Discord;
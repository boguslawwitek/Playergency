import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Login.module.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookiesBanner from '../components/CookiesBanner';
import configJSON from '../config.json';
import useSwr from 'swr';
import { useRouter } from 'next/router';

const umamiAnalyticsID = configJSON.umamiAnalyticsID;
const umamiAnalyticsSrc = configJSON.umamiAnalyticsSrc;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Discord = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [innerWidth, setInnerWidth] = useState(0);
  const { data, error } = useSwr('/api/getLoginBg', fetcher);
  const { data: userData, error: userError } = useSwr('/api/checkIfLogin', fetcher);
  if(!userError && userData && userData.login) router.push('/dashboard');
  const loginUrl = `https://discord.com/api/oauth2/authorize?client_id=${configJSON.discordClientId}&redirect_uri=${configJSON.OAuth2RedirectURI}&response_type=code&scope=${configJSON.OAuth2Scopes.join(' ')}`;

  function redirectToDiscordLogin() {
    window.location = loginUrl;
  }

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
        <title>Playergency | Panel Gracza</title>
        <link rel="icon" href="/images/favicon.ico" />
        <style>{dom.css()}</style>
        {umamiAnalyticsID && umamiAnalyticsSrc ? 
        <script async defer data-website-id={umamiAnalyticsID} src={umamiAnalyticsSrc}>
        </script> : null}
      </Head>
      <Nav innerWidth={innerWidth} />
      <main style={data && data.hasOwnProperty('loginBgUrl') && data.loginBgUrl ? {backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${data.loginBgUrl}")`} : null} className={styles.main}>
            <div className={styles.authBox}>
                <h1>{t('login')}</h1>
                <p>{t('login-p')}</p>
                <button onClick={redirectToDiscordLogin} className={styles.loginBtn}>{t('login-btn')}</button>
            </div>
      </main>
      <Footer />
      <CookiesBanner />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'policy']),
  },
})

export default Discord;
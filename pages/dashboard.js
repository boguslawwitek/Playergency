import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookiesBanner from '../components/CookiesBanner';
import data from '../config.json';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import styles from '../styles/Dashboard.module.scss';
import DashboardNav from '../components/Dashboard/DashboardNav';

const umamiAnalyticsID = data.umamiAnalyticsID;
const umamiAnalyticsSrc = data.umamiAnalyticsSrc;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Discord = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [innerWidth, setInnerWidth] = useState(0);
  const { data, error } = useSwr('/api/getLoginBg', fetcher);
  const { data: userData, error: userError } = useSwr('/api/checkIfLogin', fetcher);
  if(!userError && userData && !userData.login) router.push('/login');

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
      <main className={styles.main}>
        {userData && userData.hasOwnProperty('user') && userData.user ? (<>
          <DashboardNav userData={userData}>
            <p>{userData.user.guildMember ? <p>true</p> : <p>false</p>}</p>
          </DashboardNav>
        </>
        ) : null}
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
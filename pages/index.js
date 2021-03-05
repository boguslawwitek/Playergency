import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from '../styles/Home.module.scss';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Home = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [membersCount, setMembersCount] = useState(0);

  useEffect(() => {

    fetch("https://discord.com/api/guilds/242347815563427840/widget.json")
      .then(res => res.json())
      .then(json => setMembersCount(prevState => prevState = json.presence_count));

  }, [])

  return (
    <>
      <Head>
        <title>Playergency</title>
        <link rel="icon" href="/images/favicon.ico" />
        <style>{dom.css()}</style>
      </Head>
      <Nav />
      <Header />
      <main>
        <section className={styles.section1}>
          <p>{t('home:section1-p')}</p>
          <a href="#" className={styles.btn}>
            {membersCount ? t('home:section1-btn-with-count', {membersCount}) : t('home:section1-btn')}
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'home']),
  },
})

export default Home;
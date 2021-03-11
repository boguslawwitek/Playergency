import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classNames from 'classnames';
import styles from '../styles/Policy.module.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CookiesBanner from '../components/CookiesBanner';
import { umamiAnalyticsID, umamiAnalyticsSrc } from '../config.json';

const PrivacyPolicy = () => {
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
        <title>Playergency - {t('policy:privacy-policy')}</title>
        <link rel="icon" href="/images/favicon.ico" />
        <style>{dom.css()}</style>
        {umamiAnalyticsID && umamiAnalyticsSrc ? 
        <script async defer data-website-id={umamiAnalyticsID} src={umamiAnalyticsSrc}>
        </script> : null}
      </Head>
      <Nav innerWidth={innerWidth} />
      <main className={styles.main}>
        <p className={styles.title}>{t('policy:privacy-policy')}</p>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-a')}</p>
            <ol className={classNames(styles.list)}>
                <li>{t('policy:pp-a-li1')}</li>
                <li>{t('policy:pp-a-li2')}</li>
            </ol>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-b')}</p>
            <p>{t('policy:pp-b-p1')}</p>
            <ol className={classNames(styles.list)}>
                <li>{t('policy:pp-b-li1')}</li>
                <li>{t('policy:pp-b-li2')}</li>
                <li>{t('policy:pp-b-li3')}</li>
                <li>{t('policy:pp-b-li4')}</li>
                <li>{t('policy:pp-b-li5')}</li>
                <li>{t('policy:pp-b-li6')}</li>
                <li>{t('policy:pp-b-li7')}</li>
                <li>{t('policy:pp-b-li8')}</li>
                <li>{t('policy:pp-b-li9')}</li>
            </ol>
            <p>{t('policy:pp-b-p2')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-c')}</p>
            <p>{t('policy:pp-c-p1')}</p>
            <p>{t('policy:pp-c-p2')}</p>
            <ol className={classNames(styles.list)}>
                <li>{t('policy:pp-c-li1')}</li>
                <li>{t('policy:pp-c-li2')}</li>
                <li>{t('policy:pp-c-li3')}</li>
                <li>{t('policy:pp-c-li4')}</li>
                <li>{t('policy:pp-c-li5')}</li>
            </ol>
            <p>{t('policy:pp-c-p3')}</p>
            <p>{t('policy:pp-c-p4')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-d')}</p>
            <p>{t('policy:pp-d-p1')}</p>
            <p>{t('policy:pp-d-p2')}</p>
            <ol className={classNames(styles.list)}>
                <li>{t('policy:pp-d-li1')}</li>
                <li>{t('policy:pp-d-li2')}</li>
                <li>{t('policy:pp-d-li3')}</li>
                <li>{t('policy:pp-d-li4')}</li>
            </ol>
            <p>{t('policy:pp-d-p3')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-e')}</p>
            <p>{t('policy:pp-e-p1')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-f')}</p>
            <p>{t('policy:pp-f-p1')}</p>
            <p>{t('policy:pp-f-p2')}</p>
            <p>{t('policy:pp-f-p3')}</p>
            <p>{t('policy:pp-f-p4')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-g')}</p>
            <p>{t('policy:pp-g-p1')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-h')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional1')}</p>
            <p>{t('policy:pp-aditional1-p')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional2')}</p>
            <p>{t('policy:pp-aditional2-p')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional3')}</p>
            <p>{t('policy:pp-aditional3-p')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional4')}</p>
            <p>{t('policy:pp-aditional4-p')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional5')}</p>
            <p>{t('policy:pp-aditional5-p')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional6')}</p>
            <p>{t('policy:pp-aditional6-p')}</p>
        </div>
        <div>
            <p className={classNames(styles.bold)}>{t('policy:pp-aditional7')}</p>
            <p>{t('policy:pp-aditional7-p')}</p>
        </div>
        <div className={classNames(styles.aditional)}>
            <p>{t('policy:pp-end1')}</p>
            <p>{t('policy:pp-end2')}</p>
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

export default PrivacyPolicy;
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import styles from '../styles/Errors.module.scss';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Custom404 = () => {
    const { t } = useTranslation('common');
    const [innerWidth, setInnerWidth] = useState(0);
    const router = useRouter();

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
            <div className={styles.container404}>
                <div className={styles.box404}>
                    <div className={styles.code404}>404</div>
                    <div className={styles.text404}>{t('error-404')}</div>
                </div>
                <Link href="/">
                    <a className={styles.btn}>{t('error-go-back')}</a>
                </Link>
            </div>
            <Footer path={router.pathname} />
        </>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})

export default Custom404;
import PropTypes from 'prop-types';
import Head from 'next/head';
import { i18n, Link, withTranslation } from '../i18n';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';

const Home = ({ t }) => {
  const memberCount = 1100;

  return (
    <>
      <Head>
        <title>Playergency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={t('header-title')} desc={t('header-desc')} />
      <main>
        <section className={styles.section1}>
          <button type='button' onClick={() => i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl')}>{t('change-lang')}</button>
          <p>{t('home:section1-p')}</p>
          <button type="button" className={styles.btn}>{memberCount ? t('home:section1-btn-with-count', {memberCount}) : t('home:section1-btn')}</button>
        </section>
      </main>
    </>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['common', 'home'],
});

Home.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation(['common', 'home'])(Home);
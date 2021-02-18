import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>Playergency</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <section className={styles.section1}>
          <p>Jesteśmy społecznością graczy czyli miejscem gdzie znajdziesz kompanów do gry, porozmawiasz a także znajdziesz pomoc jeśli będziesz w potrzebie. Stale się rozwijamy i poprawiamy naszą stronę internetową oraz serwer Discord. Idziemy z trendami i dodajemy nowe funkcje aby ułatwić wam osób do gry a także nowych przyjaciół.</p>
          <button type="button">Dołącz do X użytkowników na Discordzie!</button>
        </section>
      </main>
    </>
  )
}

import '../styles/globals.scss';
import { appWithTranslation } from 'next-i18next';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faHandsHelping);

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(MyApp);

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Custom404 = () => {
    const { t } = useTranslation('common');

    return (
        <div>
            <h1>404 - Page Not Found</h1>
        </div>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
})

export default Custom404;
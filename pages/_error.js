import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Error = ({ statusCode }) => {
  
  const { t } = useTranslation('common');

  return (
    <p>
      {statusCode
        ? t('error-with-status', { statusCode })
        : t('error-without-status')}
    </p>
  )
};

Error.getInitialProps = async ({ res, err }) => {
  let statusCode = null
  if (res) {
    ({ statusCode } = res)
  } else if (err) {
    ({ statusCode } = err)
  }
  return {
    statusCode,
  }
}

Error.defaultProps = {
  statusCode: null,
}

Error.propTypes = {
  statusCode: PropTypes.number,
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default Error;
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.scss';

const Header = ({ title, desc }) => (
    <header>
        <div className={styles.wave}>
            <h1>{title}</h1>
            <h2>{desc}</h2>
            <img className={styles.wave_img} src="/red_wave.svg" alt="" />
        </div>
    </header>
)

Header.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

export default Header;
import PropTypes from 'prop-types';
import styles from '../styles/HamburgerBtn.module.scss';
import classNames from 'classnames';

const HamburgerBtn = ({menuIsOpen, setMenuIsOpen, customStyle}) => {
    const style = customStyle ? customStyle : null;

    return (
        <button className={classNames(styles.hamburger, styles['hamburger--spin'], style, {[styles['is-active']]: menuIsOpen})} type="button" aria-label="Menu" aria-controls="navigation" onClick={() => setMenuIsOpen((prevState) => !prevState)}>
            <span className={styles['hamburger-box']}><span className={styles['hamburger-inner']}></span></span>
        </button>
    )
}

HamburgerBtn.propTypes = {
    menuIsOpen: PropTypes.bool.isRequired,
    setMenuIsOpen: PropTypes.func.isRequired,
    customStyle: PropTypes.string,
}


export default HamburgerBtn;
import React, { useState } from 'react';
import styles from '../styles/DashboardNav.module.scss';
import { useTranslation } from 'next-i18next';

export const DashboardNav = () => {
    const { t } = useTranslation('common');

    const NavList = () => (
        <ul>

        </ul>
    )

    return (
        <nav>

        </nav>
    )
}

export default DashboardNav;
'use client';

import { ListSales } from '../components/Lists/listSales';
import styles from './page.module.css';

export default function Home() {
    return (
        // <div className={styles.page}>
        <div>
            <ListSales />
        </div>
    );
}

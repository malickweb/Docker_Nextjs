'use client';

import { useState, useEffect } from 'react';
import { MenuUI } from '../ui/Menu/MenuUI';
import { getMenu } from '../../services/menuService';

export default function Menu() {
    const [state, setState] = useState<boolean>(false);
    const [menu, setMenu] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menu = await getMenu();
                if (menu) {
                    console.log('menu', menu);
                    setError(false);
                    setMenu(menu);
                }
            } catch {
                setError(true);
            }
        };
        fetchMenu();
    }, []);

    if (error) return <>Erreur de chargement du menu</>;

    const handleClick = () => {
        setState((prev) => !prev);

        console.log('click');
        console.log('state', state);
    };
    return <MenuUI state={state} onClick={handleClick} menu={menu} />;
}

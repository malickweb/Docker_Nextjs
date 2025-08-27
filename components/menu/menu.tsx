'use client';

import { useState, useEffect } from 'react';
import { MenuUI } from '../ui/Menu/MenuUI';
import { getMenu } from '../../services/menuService';
export default function Menu() {
    const [state, setState] = useState<boolean>(false);
    const [menu, setMenu] = useState({});

    useEffect(() => {
        const fetchMenu = async () => {
            const menu = await getMenu();
            if (menu) {
                console.log('menu', menu);
                setMenu(menu);
            }
        };
        fetchMenu();
    }, []);

    const handleClick = () => {
        setState((prev) => !prev);
        console.log('click');
    };
    return <MenuUI state={state} onClick={handleClick} menu={menu} />;
}

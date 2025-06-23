'use client';

import { useState } from 'react';
import { MenuUI } from '../ui/Menu/MenuUI';

export default function Menu() {
    const [state, setState] = useState<boolean>(false);
    const handleClick = () => {
        setState((prev) => !prev);
        console.log('click');
    };
    return <MenuUI state={state} onClick={handleClick} />;
}

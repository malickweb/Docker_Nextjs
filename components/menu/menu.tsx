'use client';

import { useState, useEffect } from 'react';
import { MenuUI } from '../ui/Menu/MenuUI';
import { useIsMobile } from '../../hook/useIsMobile';
import { useClickOutSide } from '../../hook/useClickOutSide';
import { usefetchData } from '../../hook/useFetchData';

export default function Menu() {
    const isMobile = useIsMobile();
    const { datas, error, isLoading } = usefetchData({
        url: '/api/fetchJson?jsonFile=true&url=menu',
        jsonFile: true,
    });

    const { visible, wrapperRef } = useClickOutSide();

    const [stateMobile, setStateMobile] = useState<boolean>(false);
    const handleClick = () => {
        // setState(visible);
        console.log('HANDLE CLICK MENU ');
    };

    useEffect(() => {
        setStateMobile(isMobile);
    }, [isMobile]);

    if (isLoading) {
        return (
            <div className="containerMenu">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="containerMenu">
                <div>Error loading skills.</div>
            </div>
        );
    }
    if (datas?.success) {
        const { response } = datas;
        return <MenuUI stateMobile={stateMobile} state={visible} wrapperRef={wrapperRef} onClick={handleClick} menu={response} />;
    }
}

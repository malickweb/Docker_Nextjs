'use client';

import { useState, useEffect } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', (e) => {
            setIsMobile(e.matches);
        });
        return () => {
            mediaQuery.removeEventListener('change', (e) => {
                setIsMobile(e.matches);
            });
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            document.body.setAttribute('data-mobile', `${isMobile}`);
        } else document.body.setAttribute('data-mobile', `${isMobile}`);
    }, [isMobile]);
    return isMobile;
}

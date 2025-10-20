import { RefObject, useEffect, useRef, useState } from 'react';

export function useClickOutSide(): {
    visible: boolean;
    wrapperRef: RefObject<HTMLDivElement | null>;
} {
    const [visible, setVisible] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current?.contains(e.target as Node)) {
                setVisible(false);
            } else if (wrapperRef.current && wrapperRef.current?.contains(e.target as Node)) {
                setVisible((prev) => !prev);
            }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [visible]);

    return { visible, wrapperRef };
}

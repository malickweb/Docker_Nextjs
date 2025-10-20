import { useEffect, useState, RefObject } from 'react';

export function useIntersectionObserver({ wrapperRef }: { wrapperRef: RefObject<HTMLDivElement | null> }): {
    isVisible: boolean;
} {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
            root: null,
            rootMargin: '0px',
            threshold: 1,
        });
        observer.observe(wrapperRef.current);
        return () => {
            if (wrapperRef.current) observer.unobserve(wrapperRef.current);
            observer.disconnect();
        };
    }, [wrapperRef]);

    return { isVisible };
}

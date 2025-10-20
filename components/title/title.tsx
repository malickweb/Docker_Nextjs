'use client';

import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '../../hook/useIntersectionObserver';

import './title.css';

export function Title() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const { isVisible } = useIntersectionObserver({ wrapperRef });

    const name = 'Malick Belgrine';
    const title = 'Développeur Front-End Senior';

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;
            wrapperRef.current.style.transform = `translate(-50%, ${window.scrollY * 1.2}px)`;
            requestAnimationFrame(handleScroll);
        };
        // window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`containerTitle ${isVisible}`}>
            <div className="containerParallax" ref={wrapperRef}>
                <h1 className="name">{name}</h1>
                <h3 className="title">{title}</h3>
            </div>
        </div>
    );
}

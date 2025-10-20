import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../../hook/useIntersectionObserver';

import './CardsRoundedUI.css';

interface CardsRoundedUI {
    title: string | number;
    id?: string | number;
    onClick?: () => void;
}

export function CardsRoundedUI({ title, id, onClick }: CardsRoundedUI) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const { isVisible } = useIntersectionObserver({ wrapperRef });

    const [isApparead, setApparead] = useState<boolean>(false);

    useEffect(() => {
        if (isVisible && !isApparead) setApparead(true);
        return;
    }, [isVisible, isApparead]);

    return (
        <div ref={wrapperRef} className={`containerCardRounded ${isApparead ? `isVisible` : `notVisible`}`} onClick={onClick}>
            <div className="skill">{title}</div>
        </div>
    );
}

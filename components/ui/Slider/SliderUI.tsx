'use client';

import { useState, useEffect } from 'react';

// Interfaces
import { Sale } from '../../../interfaces/typeSale';
import { Card } from '../../../components/cards/card';
import { ArrowUI } from './Arrows/ArrowsUI';

// css
import './SliderUI.css';

export function SliderUI() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [state, setState] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [items, setItems] = useState<Sale[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/sales', { method: 'POST' });
                const result = await response.json();
                setItems(result.data);
                setError(false);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(true);
                return false;
            }
        };
        fetchData();
        return () => {
            setItems(null);
            setError(true);
            setLoading(true);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    if (!items) return <div>Aucun Produit</div>;

    const getChildDimensions = (): { cards: { [key: string]: { [key: string]: number } }; container: { [key: string]: number }; slider: { [key: string]: number } } => {
        const containerElement = document.querySelector('.containerCard') as HTMLElement;
        const sliderElement = document.querySelector('.sliderCard') as HTMLElement;
        const cardElements = document.querySelectorAll('.card') as NodeListOf<HTMLElement>;

        if (containerElement && sliderElement) {
            return {
                container: {
                    width: containerElement.offsetWidth,
                    height: containerElement.offsetHeight,
                },
                slider: {
                    width: sliderElement.offsetWidth,
                    height: sliderElement.offsetHeight,
                },
                cards: Array.from(cardElements).reduce((acc, card, idx) => {
                    acc[idx] = {
                        width: card.offsetWidth,
                        height: card.offsetHeight,
                    };
                    return acc;
                }, {} as { [key: string]: { [key: string]: number } }),
            };
        }
        return {
            cards: {},
            container: { width: 0, height: 0 },
            slider: { width: 0, height: 0 },
        };
    };

    const handleClick = () => {
        setState((prev) => !prev);
        console.log('State', state);
    };

    const handleClickArrow = (direction: string) => {
        if (direction === 'right' && items?.length > currentSlide + 1) setCurrentSlide((prev) => prev + 1);
        else if (items?.length === currentSlide + 1) setCurrentSlide(0);
        if (currentSlide !== 0 && direction === 'left') setCurrentSlide((prev) => prev - 1);
    };

    return (
        <div className="containerSlider">
            <div className="slider">
                <ArrowUI onClick={handleClickArrow} />
                <Card data={items} currentSlide={currentSlide} onClick={handleClick} offsetElement={getChildDimensions} />
            </div>
        </div>
    );
}

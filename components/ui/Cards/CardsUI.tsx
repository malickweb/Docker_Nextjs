'use client';

import { useEffect, useState } from 'react';
import { Sale, Customer } from '../../../interfaces/typeSale';
import './CardsUI.css';

interface Slider {
    data: Sale[];
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    offsetElement?: () => OffsetElement;
    currentSlide?: number;
}

interface OffsetElement {
    cards: { [key: string]: { [key: string]: number } };
    container: { [key: string]: number };
    slider: { [key: string]: number };
}

export function CardsUI({ data, size = 'md', onClick, offsetElement, currentSlide }: Slider) {
    const [widthSlider, setWidthSlider] = useState<number>(0);
    const [widthCards, setWidthCards] = useState<number>(0);
    const items = data;

    const getStyles = () => {
        // Size styles
        const sizeStyles = {
            sm: { padding: '8px 16px', fontSize: '14px' },
            md: { padding: '12px 24px', fontSize: '16px' },
            lg: { padding: '16px 32px', fontSize: '18px' },
        };

        console.log('widthCards', widthCards);

        return { ...sizeStyles[size], width: widthCards };
    };

    useEffect(() => {
        if (typeof offsetElement === 'function') {
            const a = offsetElement();
            console.log('A', a);
            setWidthSlider(a?.slider?.width);
            setWidthCards(a?.container?.width);
        }
        return;
    }, []);

    //const marginLeft = -(currentSlide ? currentSlide * (widthSlider / data?.length) : 0); // Position actuelle
    const marginLeft = -(currentSlide ? currentSlide * widthCards : 0); // Position actuelle
    console.log('marginLeft', marginLeft);
    console.log('widthSlider', widthSlider);

    return (
        <div className="containerCard">
            <div className="sliderCard" style={{ marginLeft: `${marginLeft}px` }}>
                {items.map((elm: Sale, idx: number) => (
                    <div key={`${elm._id}-${idx}`} data-id={idx} className={`card ${idx === currentSlide ? `active` : ``}`} style={getStyles()} onClick={onClick}>
                        <ul>
                            {Object.keys(elm.customer).map((info) => {
                                return (
                                    <li key={info}>
                                        {info}: {elm.customer[info as keyof Customer]}
                                    </li>
                                );
                            })}
                        </ul>
                        <form>
                            <select id="selectProduct">
                                {elm.items.map((item, index) => {
                                    return (
                                        <option key={index} data-tags={item.tags} value={item.name} data-price={item.price.$numberDecimal} data-qty={item.quantity}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}

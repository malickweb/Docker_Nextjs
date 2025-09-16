import { Sale } from '../../interfaces/typeSale';
import { CardsUI } from '../ui/Cards/CardsUI';

interface Slider {
    data: Sale[];
    onClick?: () => void;
    offsetElement?: () => { cards: { [key: string]: { [key: string]: number } }; container: { [key: string]: number }; slider: { [key: string]: number } };
    currentSlide?: number;
}

export function Card({ data, onClick, offsetElement, currentSlide }: Slider) {
    const items = data;

    return <CardsUI data={items} currentSlide={currentSlide} onClick={onClick} offsetElement={offsetElement} />;
}

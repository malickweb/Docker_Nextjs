//import { getMenu } from '../../../services/menuService';
import './MenuUI.css';
import Link from 'next/link';

interface MenuUIProps {
    state?: boolean;
    onClick?: () => void;
    menu: { [key: string]: { [url: string]: string } };
}

export function MenuUI({ state, onClick, menu }: MenuUIProps) {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick?.();
    };

    return (
        <div className={`container`}>
            <nav className={`container_nav ${!state ? 'hidden' : ''}`}>
                <ul>
                    {Object.keys(menu)?.map((item: string, index: number) => (
                        <li key={index}>
                            <Link href={`${menu[item].url}`}>{`${item}`}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={`container_burgerMenu`} onClick={handleClick}>
                <div className={`burgerMenu ${state ? 'rotate' : ''}`}></div>
            </div>
        </div>
    );
}

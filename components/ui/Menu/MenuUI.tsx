import './MenuUI.css';

interface MenuUIProps {
    state?: boolean;
    onClick?: () => void;
}

export function MenuUI({ state, onClick }: MenuUIProps) {
    const handleClick = () => {
        onClick?.();
    };

    return (
        <div className={`container`}>
            <div className={`container_burgerMenu`} onClick={handleClick}>
                <div className={`burgerMenu ${state ? 'rotate' : ''}`}></div>
            </div>
            <nav className={`container_nav ${!state ? 'hidden' : ''}`}>
                <div className={`container_burgerMenu`} onClick={handleClick}>
                    <div className={`burgerMenu ${state ? 'rotate' : ''}`}></div>
                </div>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

import './ArrowsUI.css';

interface Arrow {
    onClick?: ((direction: string) => void) | undefined;
    children?: React.ReactNode;
}

export function ArrowUI({ onClick, children }: Arrow) {
    if (!children)
        return (
            <div className="containerArrow">
                <div className="arrowLeft" onClick={() => onClick?.('left')}>
                    LEFT
                </div>
                <div className="arrowRight" onClick={() => onClick?.('right')}>
                    RIGHT
                </div>
            </div>
        );
    return (
        <div className="containerArrow">
            <div className="arrowLeft" onClick={() => onClick?.('left')}>
                LEFT
            </div>
            {children}
            <div className="arrowRight" onClick={() => onClick?.('right')}>
                RIGHT
            </div>
        </div>
    );
}

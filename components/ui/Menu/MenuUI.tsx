import React, { RefObject } from 'react';
import { ButtonTheme } from '../ButtonTheme/ButtonTheme';
import Link from 'next/link';
import { CheckboxTheme } from '../CheckboxTheme/CheckboxTheme';
import './MenuUI.css';

type Menu = {
    [key: string]: string | number;
}[];

type MenuUIProps = {
    stateMobile?: boolean;
    state?: boolean;
    wrapperRef?: RefObject<HTMLDivElement | null>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    menu: Menu;
};

export function MenuUI({ stateMobile, state, wrapperRef, onClick, menu }: MenuUIProps) {
    const handleClick: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement> = (e) => {
        onClick?.(e as React.MouseEvent<HTMLDivElement>);
    };
    if (!stateMobile) {
        return (
            <div className={`containerMenu`} ref={wrapperRef}>
                <nav className={`container_nav`}>
                    <ul>
                        {menu.map((item, i) => (
                            <li key={i}>
                                <Link onClick={handleClick} href={`${item.url}`}>{`${item.title}`}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* <div className="btnTheme">
                    <ButtonTheme />
                </div> */}
                <div className="btnTheme">
                    <CheckboxTheme />
                </div>
            </div>
        );
    }
    return (
        <div className={`containerMenuMobile`} ref={wrapperRef}>
            <nav className={`container_navMobile ${!state ? 'hidden' : ''}`}>
                <div className={`container_burgerMenu`} onClick={handleClick}>
                    <div className={`burgerMenu ${state ? 'rotate' : ''}`}></div>
                </div>
                <ul>
                    {menu.map((item, i) => (
                        <li key={i}>
                            <Link onClick={handleClick} href={`${item.url}`}>{`${item.title}`}</Link>
                        </li>
                    ))}
                </ul>
                <div className="btnTheme">
                    <ButtonTheme />
                </div>
            </nav>
            <div className={`container_burgerMenu`} onClick={handleClick}>
                <div className={`burgerMenu ${state ? 'rotate' : ''}`}></div>
            </div>
        </div>
    );
}

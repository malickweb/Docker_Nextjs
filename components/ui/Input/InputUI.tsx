'use client';

import React, { useState } from 'react';
import './InputUI.css';

type InputUI = {
    type?: 'text' | 'button' | 'checkbox' | 'radio' | 'range';
    name: string;
    placeholder?: string;
    value?: string;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputCheckbox = {
    name: string;
    onClick?: () => void;
};

function InputCheckbox({ name, onClick }: InputCheckbox) {
    console.log('InputCheckbox');
    return (
        <div className="containerCheckbox">
            <input type="checkbox" className="sc-gJwTLC ikxBAC" onClick={onClick} />
        </div>
    );
}

export function InputUI({ type = 'text', name, placeholder, value, onClick, onChange }: InputUI) {
    const [state, setState] = useState();

    const styles = {};

    const handleClick = () => {
        onClick?.();
        console.log('CLICK');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);

        console.log('CHANGE');
    };

    if (type === 'checkbox') return <InputCheckbox name={name} onClick={handleClick} />;

    return (
        <div className={`containerInput`}>
            <label htmlFor={name}>{name}</label>
            <input type={type} id={name} name={name} placeholder={placeholder} onChange={handleChange} />
        </div>
    );
}

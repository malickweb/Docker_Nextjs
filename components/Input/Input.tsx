import React, { useState } from 'react';
import { InputUI } from '../ui/Input/InputUI';

type INPUT = {
    type: 'text' | 'checkbox';
    name: string;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ type, name, onClick, onChange }: INPUT) {
    const [state, setState] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        text: '',
    });

    const handleClick = () => {
        setState((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange?.(e);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log('NAME', formData);
        console.log('VALUE', value);
    };

    return <InputUI name={type} value={formData.text} onClick={handleClick} onChange={handleChange} />;
}

import { useState } from 'react';

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    name: string;
    placeholder?: string;
    value?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function InputInit({ type = 'text', name, placeholder, value = '', error, required = false, disabled = false, onChange, onFocus, onBlur }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
            width: '100%',
        },
        input: {
            padding: '8px 10px',
            border: `1px solid ${error ? '#ef4444' : isFocused ? '#4f46e5' : '#d1d5db'}`,
            borderRadius: '5px',
            outline: 'none',
            backgroundColor: disabled ? '#f9fafb' : 'white',
            color: disabled ? '#6b7280' : '#111827',
            boxShadow: error ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : isFocused ? '0 0 0 3px rgba(79, 70, 229, 0.1)' : 'none',
        },
        error: {
            color: '#ef4444',
        },
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <div style={styles.container} className="container_inputEmail">
            <input style={styles.input} type={type} name={name} placeholder={placeholder} value={value} required onFocus={handleFocus} onBlur={handleBlur} onChange={onChange} />
            {error && <div style={styles.error}>{error}</div>}
        </div>
    );
}

'use client';

import { useState } from 'react';

interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    name: string;
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    required?: boolean;
    autoComplete?: string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    className?: string;
}

export function Input({ type = 'text', name, label, placeholder, value = '', error, required = false, autoComplete, disabled = false, onChange, onFocus, onBlur, className = '' }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
            width: '100%',
        },
        label: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            margin: '0',
        },
        inputContainer: {
            position: 'relative' as const,
            width: '100%',
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            border: `1px solid ${error ? '#ef4444' : isFocused ? '#4f46e5' : '#d1d5db'}`,
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            outline: 'none',
            backgroundColor: disabled ? '#f9fafb' : 'white',
            color: disabled ? '#6b7280' : '#111827',
            boxShadow: error ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : isFocused ? '0 0 0 3px rgba(79, 70, 229, 0.1)' : 'none',
        },
        passwordToggle: {
            position: 'absolute' as const,
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#6b7280',
            fontSize: '16px',
        },
        errorText: {
            color: '#ef4444',
            fontSize: '14px',
            margin: '0',
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
        <div style={styles.container} className={className}>
            {label && (
                <label htmlFor={name} style={styles.label}>
                    {label}
                    {required && <span style={{ color: '#ef4444' }}> *</span>}
                </label>
            )}

            <div style={styles.inputContainer}>
                <input
                    id={name}
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={styles.input}
                />

                {type === 'password' && (
                    <button type="button" style={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)} disabled={disabled}>
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                )}
            </div>

            {error && <p style={styles.errorText}>{error}</p>}
        </div>
    );
}

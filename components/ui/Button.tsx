'use client';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    fullWidth?: boolean;
}

export function Button({ type = 'button', variant = 'primary', size = 'md', disabled = false, loading = false, children, onClick, className = '', fullWidth = false }: ButtonProps) {
    const getStyles = () => {
        const baseStyles = {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            outline: 'none',
            textDecoration: 'none',
            width: fullWidth ? '100%' : 'auto',
            opacity: disabled || loading ? '0.5' : '1',
        };

        // Size styles
        const sizeStyles = {
            sm: { padding: '8px 16px', fontSize: '14px' },
            md: { padding: '12px 24px', fontSize: '16px' },
            lg: { padding: '16px 32px', fontSize: '18px' },
        };

        // Variant styles
        let variantStyles = {};
        switch (variant) {
            case 'primary':
                variantStyles = {
                    backgroundColor: '#4f46e5',
                    color: 'white',
                };
                break;
            case 'secondary':
                variantStyles = {
                    backgroundColor: '#6b7280',
                    color: 'white',
                };
                break;
            case 'outline':
                variantStyles = {
                    backgroundColor: 'transparent',
                    color: '#4f46e5',
                    border: '1px solid #4f46e5',
                };
                break;
            case 'ghost':
                variantStyles = {
                    backgroundColor: 'transparent',
                    color: '#6b7280',
                };
                break;
            case 'danger':
                variantStyles = {
                    backgroundColor: '#ef4444',
                    color: 'white',
                };
                break;
        }

        return { ...baseStyles, ...sizeStyles[size], ...variantStyles };
    };

    const handleClick = () => {
        if (!disabled && !loading && onClick) {
            onClick();
        }
    };

    return (
        <button type={type} disabled={disabled || loading} onClick={handleClick} style={getStyles()} className={className}>
            {loading && (
                <div
                    style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid currentColor',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                />
            )}
            {children}
        </button>
    );
}

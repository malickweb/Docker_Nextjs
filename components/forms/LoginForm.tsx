'use client';

import { useEffect, useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface LoginFormProps {
    onSubmit?: (data: { email: string; password: string }) => void;
    loading?: boolean;
    errorData?: boolean;
}

export function LoginForm({ onSubmit, loading = false, errorData }: LoginFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.email) {
            newErrors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format d'email invalide";
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Effacer l'erreur quand l'utilisateur commence à taper
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log('formData', formData);

        onSubmit?.(formData);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            padding: '48px 16px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        formWrapper: {
            maxWidth: '400px',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            border: '1px solid #e5e7eb',
        },
        header: {
            textAlign: 'center' as const,
            marginBottom: '32px',
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 8px 0',
        },
        subtitle: {
            fontSize: '14px',
            color: '#6b7280',
            margin: '0',
        },
        link: {
            color: '#4f46e5',
            textDecoration: 'none',
            fontWeight: '500',
        },
        form: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '24px',
        },
        optionsRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '14px',
        },
        checkboxGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        checkbox: {
            width: '16px',
            height: '16px',
            accentColor: '#4f46e5',
        },
    };

    useEffect(() => {
        if (errors.email) {
            console.log('Erreur email:', errors.email);
            console.log('Erreur email errorData:', errorData);
        }
    }, [errors, errorData]);

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Connexion à votre compte</h1>
                    <p style={styles.subtitle}>
                        Ou{' '}
                        <a href="#" style={styles.link}>
                            créez un nouveau compte
                        </a>
                    </p>
                </div>

                <form style={styles.form} onSubmit={handleSubmit}>
                    <Input type="email" name="email" placeholder="Adresse email" autoComplete="email" required value={formData.email} error={errors.email} onChange={handleInputChange} />
                    {!errorData && <div>mot de passe incorrect</div>}
                    <Input type="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required value={formData.password} error={errors.password} onChange={handleInputChange} />

                    <div style={styles.optionsRow}>
                        <div style={styles.checkboxGroup}>
                            <input type="checkbox" id="remember-me" style={styles.checkbox} />
                            <label htmlFor="remember-me" style={{ color: '#374151', cursor: 'pointer' }}>
                                Se souvenir de moi
                            </label>
                        </div>
                        <a href="#" style={styles.link}>
                            Mot de passe oublié ?
                        </a>
                    </div>

                    <Button type="submit" loading={loading} fullWidth>
                        🔐 Se connecter
                    </Button>
                </form>
            </div>
        </div>
    );
}

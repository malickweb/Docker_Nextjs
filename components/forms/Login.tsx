'use client';

import { useState } from 'react';
import { InputInit } from '../ui/InputInit';
import ButtonInit from '../ui/ButtonInit';

interface LoginProps {
    onSubmit?: (data: { email: string; password: string }) => void;
}
export function Login({ onSubmit }: LoginProps) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Efface l'erreur des que le user commence à taper
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit?.(formData);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
            width: '80%',
            margin: '0 auto',
            padding: '30px',
            border: '1px solid',
            borderRadius: '5px',
        },
        title: {
            fontSize: '22px',
            fontWeight: 700,
            textAlign: 'center' as const,
            marginTop: '8px',
        },
        subtitle: {
            fontSize: '18px',
            fontWeight: 600,
            textAlign: 'center' as const,
            marginTop: '8px',
        },
        containerFormulaire: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '10px',
        },
    };

    return (
        <div style={styles.container} className={`container_login`}>
            <div style={styles.title} className={`container_title`}>
                Titre
            </div>
            <div style={styles.subtitle} className="container_subtitle">
                Sous-titre
            </div>
            <div className="container_formulaire">
                <form onSubmit={handleSubmit}>
                    <div style={styles.containerFormulaire}>
                        <InputInit type={'email'} name={'email'} placeholder={'Veuillez entrer votre email'} value={formData.email} error={errors.email} required onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                        <InputInit
                            type={'password'}
                            name={'password'}
                            placeholder={'Veuillez entrer votre mot de passe'}
                            value={formData.password}
                            error={errors.password}
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <ButtonInit type="submit">Se connecter</ButtonInit>
                    </div>
                </form>
            </div>
        </div>
    );
}

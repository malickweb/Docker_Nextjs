'use client';

import { useState } from 'react';
import { LoginForm } from '../../components/forms/LoginForm';

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState<any>(null);
    const [errors, setErrors] = useState(true);

    const handleLogin = async (formData: { email: string; password: string }) => {
        setIsLoading(true);

        try {
            console.log('Tentative de connexion avec:', formData);

            const response = await fetch('/api/users');
            const data = await response.json();
            console.log('data ===> ', data);

            if (data.success) {
                const { email, password } = formData;
                console.log('email ===> ', email);
                console.log('data.data.email ===> ', data.data.email);
                if (email !== data.data.email) {
                    setErrors(true);
                    console.log("L'email ou mot de passe incorrecte");
                    return;
                }
                setErrors(false);
                setDatas(data.data);
                console.log('Connexion réussie:', data.data);
            } else {
                setErrors(true);
                console.log('Erreur:', data.error);
            }
        } catch (error) {
            setErrors(true);
            console.error('Erreur de connexion:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return <LoginForm onSubmit={handleLogin} loading={isLoading} errorData={errors} />;
}

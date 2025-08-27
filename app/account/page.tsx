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

            const response = await fetch('/api/users', { method: 'POST', body: JSON.stringify({ email: formData.email, password: formData.password }) });
            const responseTest = await fetch('/api/auth/', { method: 'POST', body: JSON.stringify({ email: formData.email, password: formData.password }) });
            const data = await response.json();
            const dataTest = await responseTest.json();
            console.log('data ===> ', data);
            console.log('dataTest ===> ', dataTest);

            if (data.success) {
                const { email } = formData;
                console.log('email ===> ', email);
                console.log('data.data ===> ', data.data);
                console.log('data.data.email ===> ', data.data[0].email);
                if (email !== data.data[0].email) {
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

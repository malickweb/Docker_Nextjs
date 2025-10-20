'use client';

import { useState } from 'react';
import { LoginForm } from '../../components/Forms/loginForm';

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [datas, setDatas] = useState<{ [key: string]: string } | null>(null);
    const [errors, setErrors] = useState(true);

    const handleLogin = async (formData: { email: string; password: string }) => {
        setIsLoading(true);

        try {
            console.log('Tentative de connexion avec:', formData);

            const response = await fetch('/api/users', { method: 'POST', body: JSON.stringify({ email: formData.email, password: formData.password }) });
            // const responseTest = await fetch('/api/auth/', { method: 'POST', body: JSON.stringify({ email: formData.email, password: formData.password }) });
            const data = await response.json();
            // const dataTest = await responseTest.json();

            if (data.success) {
                const { email } = formData;
                if (email !== data.data[0].email) {
                    setErrors(true);
                    return "L'email ou mot de passe incorrecte";
                }
                setErrors(false);
                setDatas(data.data);
                return datas;
            } else {
                setErrors(true);
                return errors;
            }
        } catch (error) {
            setErrors(true);
            return `Erreur de connexion : ${error}`;
        } finally {
            setIsLoading(false);
        }
    };

    return <LoginForm onSubmit={handleLogin} loading={isLoading} errorData={errors} />;
}

'use client';

import { useEffect, useState } from 'react';
import { Login } from '../../components/forms/Login';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [state, setState] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const t = window.localStorage.getItem('tokenSite');
        if (!t) return;

        const checkToken = async () => {
            try {
                const res = await fetch('/api/auth/token', {
                    method: 'GET',
                    headers: {
                        authorization: `Bearer ${t}`,
                    },
                });
                const data = await res.json();
                if (data?.success) {
                    setState(true);
                    setToken(t);
                    // router.replace('/');
                } else {
                    window.localStorage.removeItem('tokenSite');
                    setState(false);
                    setToken(null);
                }
            } catch {
                window.localStorage.removeItem('tokenSite');
                setState(false);
                setToken(null);
            }
        };
        checkToken();
    }, [router]);

    const handleLogin = async (formData: { email: string; password: string }) => {
        try {
            const responseTestRegister = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email: formData.email, password: formData.password }) });
            const dataTestRegister = await responseTestRegister.json();

            setState(!!dataTestRegister?.result?.success);
            setToken(dataTestRegister?.result.token ?? null);

            if (token && state) {
                window.localStorage.setItem('tokenSite', dataTestRegister?.result?.token);
                // router.replace('/');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        } finally {
            console.log('Fin de la connexion');
        }
    };

    return <Login onSubmit={handleLogin} />;
}

'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null;
        if (stored) {
            setTheme(stored);
            document.documentElement.setAttribute('data-theme', stored);
            return;
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial: Theme = prefersDark ? 'dark' : 'light';
        setTheme(initial);
        document.documentElement.setAttribute('data-theme', initial);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch {}
    }, [theme]);

    const toggleTheme = useCallback(() => {
        console.log('Use callBack ', theme);
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    console.log('ThemeContext', ctx);
    if (!ctx) {
        throw new Error('UseTheme used within ThemeProvider');
    }
    return ctx;
}

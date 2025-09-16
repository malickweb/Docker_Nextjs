'use client';

import { useTheme } from '../../Theme/ThemeProvider';

export function ButtonTheme() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button type="button" id={`theme`} onClick={toggleTheme} aria-label="Basculer le thème">
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}

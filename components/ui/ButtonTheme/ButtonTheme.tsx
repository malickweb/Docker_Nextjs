'use client';

import { useTheme } from '../../theme/ThemeProvider';

export function ButtonTheme() {
    const { theme, toggleTheme } = useTheme();
    return (
        <button type="button" id={`theme`} onClick={toggleTheme} aria-label="Basculer le thème">
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}

import './CheckboxTheme.css';

import { useTheme } from '../../Theme/ThemeProvider';

export function CheckboxTheme() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={`containerCheckboxTheme ${theme}`}>
            <label>
                <input type="checkbox" name="checkboxTheme" onClick={toggleTheme} />
                <span></span>
            </label>
        </div>
    );
}

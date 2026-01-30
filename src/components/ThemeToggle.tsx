import { useEffect, useState } from 'react';
import { loadTheme, saveTheme } from '../services/storage';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const saved = loadTheme();
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = saved || (systemDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.body.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        saveTheme(newTheme);
        if (newTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
    };

    return (
        <label className="theme-switch" aria-label="Toggle Theme">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
            <div className="theme-switch__slider">
                <span className="theme-switch__icon sun">☀️</span>
                <span className="theme-switch__icon moon">🌙</span>
            </div>
        </label>
    );
}

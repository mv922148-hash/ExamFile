
const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => { },
    colorTheme: 'blue',
    setColorTheme: () => { }
});

const COLOR_THEMES = {
    blue: {
        primary: '#3b82f6',
        secondary: '#60a5fa',
        accent: '#93c5fd'
    },
    purple: {
        primary: '#8b5cf6',
        secondary: '#a78bfa',
        accent: '#c4b5fd'
    },
    green: {
        primary: '#10b981',
        secondary: '#34d399',
        accent: '#6ee7b7'
    },
    orange: {
        primary: '#f97316',
        secondary: '#fb923c',
        accent: '#fdba74'
    }
};

function ThemeProvider({ children }) {
    const [theme, setTheme] = React.useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    const [colorTheme, setColorTheme] = React.useState(() => {
        return localStorage.getItem('color_theme') || 'blue';
    });

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    React.useEffect(() => {
        const colors = COLOR_THEMES[colorTheme];
        document.documentElement.style.setProperty('--primary-color', colors.primary);
        document.documentElement.style.setProperty('--secondary-color', colors.secondary);
        document.documentElement.style.setProperty('--accent-color', colors.accent);
        document.documentElement.style.setProperty('--border-focus', colors.primary);
        localStorage.setItem('color_theme', colorTheme);
    }, [colorTheme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const currentColors = COLOR_THEMES[colorTheme];

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colorTheme, setColorTheme, colors: currentColors }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    return React.useContext(ThemeContext);
}

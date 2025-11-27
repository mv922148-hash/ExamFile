
const ThemeContext = React.createContext({
    theme: 'light',
    toggleTheme: () => { },
});

function ThemeProvider({ children }) {
    const [theme, setTheme] = React.useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function useTheme() {
    return React.useContext(ThemeContext);
}

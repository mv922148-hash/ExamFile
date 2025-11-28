class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg">
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function PersonalizationApp() {
    try {
        const [sidebarOpen, setSidebarOpen] = React.useState(false);
        const currentUser = requireAuth();
        const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme();

        if (!currentUser) return null;

        return (
            <div className="min-h-screen" data-name="personalization-app" data-file="personalization-app.js">
                <Topbar user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />

                <div className={`pt-28 pb-8 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Personalización</h2>

                        <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="p-3 rounded-xl bg-[var(--primary-color)] bg-opacity-10 text-[var(--primary-color)]">
                                    <div className="icon-palette text-2xl"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Apariencia</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Personaliza la apariencia de la interfaz</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Theme Toggle */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)]">
                                    <div>
                                        <h4 className="font-medium text-[var(--text-main)]">Tema Oscuro</h4>
                                        <p className="text-xs text-[var(--text-secondary)]">Cambiar entre modo claro y oscuro</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={theme === 'dark'}
                                            onChange={toggleTheme}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                                    </label>
                                </div>

                                {/* Color Theme Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-main)] mb-3">Color de Acento</label>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { id: 'blue', color: '#3b82f6', name: 'Azul' },
                                            { id: 'purple', color: '#8b5cf6', name: 'Morado' },
                                            { id: 'green', color: '#10b981', name: 'Verde' },
                                            { id: 'orange', color: '#f97316', name: 'Naranja' }
                                        ].map((colorOption) => (
                                            <button
                                                key={colorOption.id}
                                                onClick={() => setColorTheme(colorOption.id)}
                                                className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${colorTheme === colorOption.id ? 'ring-2 ring-offset-2 ring-[var(--text-main)] scale-110' : ''}`}
                                                style={{ backgroundColor: colorOption.color }}
                                                title={colorOption.name}
                                            >
                                                {colorTheme === colorOption.id && (
                                                    <div className="icon-check text-white text-xl"></div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PersonalizationApp component error:', error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <ThemeProvider>
            <PersonalizationApp />
        </ThemeProvider>
    </ErrorBoundary>
);

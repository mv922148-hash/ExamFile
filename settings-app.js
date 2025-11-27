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

function SettingsApp() {
    try {
        const [sidebarOpen, setSidebarOpen] = React.useState(false);
        const currentUser = requireAuth();
        const { theme, toggleTheme, colorTheme, setColorTheme } = useTheme();

        // Form states
        const [name, setName] = React.useState(currentUser?.name || '');
        const [email, setEmail] = React.useState(currentUser?.email || '');
        const [avatar, setAvatar] = React.useState(currentUser?.avatar || '');
        const [currentPassword, setCurrentPassword] = React.useState('');
        const [newPassword, setNewPassword] = React.useState('');
        const [notifications, setNotifications] = React.useState({
            email: true,
            push: true,
            marketing: false
        });

        if (!currentUser) return null;

        const handleSaveProfile = (e) => {
            e.preventDefault();
            // Update user data in session storage to persist changes
            const updatedUser = { ...currentUser, name, email, avatar };
            sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Also update local storage if used elsewhere, but sessionStorage is primary for auth.js
            localStorage.setItem('trickle_user', JSON.stringify(updatedUser));

            alert('Perfil actualizado con éxito');
            window.location.reload(); // Reload to reflect changes in Topbar/Sidebar
        };

        const handleSaveSecurity = (e) => {
            e.preventDefault();
            alert('Contraseña actualizada (simulado)');
        };

        const PRESET_AVATARS = [
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Jocelyn',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Sparky'
        ];

        const handleFileUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatar(reader.result);
                };
                reader.readAsDataURL(file);
            }
        };

        return (
            <div className="min-h-screen" data-name="settings-app" data-file="settings-app.js">
                <Topbar user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className={`pt-28 pb-8 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-[var(--text-main)] mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Configuraciones</h2>

                        <div className="space-y-8">
                            {/* Customization Section */}
                            <div id="customization" className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 rounded-xl bg-[var(--primary-color)] bg-opacity-10 text-[var(--primary-color)]">
                                        <div className="icon-palette text-2xl"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">Personalización</h3>
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

                            {/* Profile Section */}
                            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 rounded-xl bg-[var(--primary-color)] bg-opacity-10 text-[var(--primary-color)]">
                                        <div className="icon-user text-2xl"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">Perfil</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">Actualiza tu información personal</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSaveProfile} className="space-y-6">
                                    <div className="flex flex-col items-center mb-6 space-y-6">
                                        {/* Current Avatar Preview */}
                                        <div className="relative group cursor-pointer">
                                            <img
                                                src={avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'}
                                                alt="Profile Preview"
                                                className="w-32 h-32 rounded-full border-4 border-[var(--bg-card)] shadow-lg object-cover"
                                            />
                                            <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                                <div className="icon-camera text-white text-2xl"></div>
                                                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                            </label>
                                        </div>

                                        {/* Preset Avatars */}
                                        <div className="w-full">
                                            <label className="block text-sm font-medium text-[var(--text-main)] mb-3 text-center">Elige un avatar predeterminado</label>
                                            <div className="flex flex-wrap justify-center gap-4">
                                                {PRESET_AVATARS.map((preset, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => setAvatar(preset)}
                                                        className={`w-12 h-12 rounded-full border-2 transition-transform hover:scale-110 ${avatar === preset ? 'border-[var(--primary-color)] scale-110' : 'border-transparent'}`}
                                                    >
                                                        <img src={preset} alt={`Avatar ${index + 1}`} className="w-full h-full rounded-full" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Upload Button */}
                                        <div className="flex items-center space-x-4">
                                            <label className="cursor-pointer px-4 py-2 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors text-sm font-medium text-[var(--text-main)] flex items-center space-x-2">
                                                <div className="icon-upload"></div>
                                                <span>Subir imagen propia</span>
                                                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Nombre Completo</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="glass-input"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Correo Electrónico</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="glass-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="px-6 py-2 bg-[var(--primary-color)] hover:bg-[var(--secondary-color)] text-white rounded-lg transition-colors duration-300 shadow-md">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Security Section */}
                            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 rounded-xl bg-red-500 bg-opacity-10 text-red-500">
                                        <div className="icon-shield text-2xl"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">Seguridad</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">Gestiona tu contraseña y seguridad</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSaveSecurity} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Contraseña Actual</label>
                                            <input
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="glass-input"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-main)] mb-2">Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="glass-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="px-6 py-2 border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] rounded-lg transition-colors duration-300">
                                            Actualizar Contraseña
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Notifications Section */}
                            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 rounded-xl bg-blue-500 bg-opacity-10 text-blue-500">
                                        <div className="icon-bell text-2xl"></div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">Notificaciones</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">Elige cómo quieres ser notificado</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)]">
                                        <div>
                                            <h4 className="font-medium text-[var(--text-main)]">Notificaciones por Correo</h4>
                                            <p className="text-xs text-[var(--text-secondary)]">Recibe actualizaciones importantes en tu email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.email} onChange={() => setNotifications({ ...notifications, email: !notifications.email })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)]">
                                        <div>
                                            <h4 className="font-medium text-[var(--text-main)]">Notificaciones Push</h4>
                                            <p className="text-xs text-[var(--text-secondary)]">Recibe alertas en tu navegador</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.push} onChange={() => setNotifications({ ...notifications, push: !notifications.push })} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary-color)]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('SettingsApp component error:', error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <ThemeProvider>
            <SettingsApp />
        </ThemeProvider>
    </ErrorBoundary>
);

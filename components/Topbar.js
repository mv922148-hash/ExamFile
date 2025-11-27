function Topbar({ user, onMenuClick, sidebarOpen }) {
  try {
    const [showNotifications, setShowNotifications] = React.useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
      <div className={`fixed top-0 right-0 z-50 px-6 pt-6 transition-all duration-300 ${sidebarOpen ? 'left-72' : 'left-0'}`} data-name="topbar" data-file="components/Topbar.js">
        <div className="bg-white/10 backdrop-blur-3xl backdrop-saturate-150 border-b border-white/20 shadow-lg rounded-full px-6 py-4 flex items-center justify-between transition-colors duration-300">
          <div className="flex items-center space-x-6">
            <button onClick={onMenuClick} className="hover:scale-110 transition-transform duration-300">
              <div className="icon-menu text-2xl text-[var(--text-main)]"></div>
            </button>
            <a href="dashboard.html" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <div className="icon-home text-xl text-[var(--primary-color)]"></div>
              <span className="font-semibold text-[var(--text-main)]">Inicio</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--bg-card-hover)] transition-colors duration-300"
              title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              <div className={`text-xl text-[var(--text-main)] ${theme === 'light' ? 'icon-moon' : 'icon-sun'}`}></div>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:scale-110 transition-transform duration-300"
              >
                <div className="icon-bell text-xl text-[var(--text-main)]"></div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary-color)] rounded-full text-white text-xs flex items-center justify-center">3</span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-[var(--bg-card)] backdrop-blur-md border border-[var(--border-color)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 shadow-xl">
                  <h3 className="font-semibold text-[var(--text-main)] mb-3">Notificaciones</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-white bg-opacity-40 rounded-lg hover:bg-opacity-60 transition-all duration-300 cursor-pointer">
                      <p className="text-sm text-[var(--text-main)]">Nuevo usuario registrado</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">Hace 5 minutos</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[var(--primary-color)]" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-[var(--text-main)]">{user.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Topbar component error:', error);
    return null;
  }
}
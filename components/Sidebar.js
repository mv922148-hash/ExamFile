function Sidebar({ isOpen, onClose }) {
  try {
    const currentPath = window.location.pathname;
    const isActive = (path) => currentPath.includes(path);

    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden" onClick={onClose}></div>
        )}

        <div className={`fixed top-4 left-4 h-[calc(100vh-2rem)] w-72 bg-white/10 backdrop-blur-3xl backdrop-saturate-150 border border-white/20 rounded-3xl shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)]'}`} data-name="sidebar" data-file="components/Sidebar.js">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-[var(--text-main)]">Menú</h2>
              <button onClick={onClose} className="lg:hidden hover:scale-110 transition-transform duration-300">
                <div className="icon-x text-xl text-[var(--text-main)]"></div>
              </button>
            </div>

            <nav className="space-y-3">
              <a href="dashboard.html" className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isActive('dashboard.html') ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'}`}>
                <div className="icon-layout-dashboard text-xl"></div>
                <span className="font-medium">Inicio</span>
              </a>

              <a href="users.html" className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isActive('users.html') ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'}`}>
                <div className="icon-users text-xl"></div>
                <span className="font-medium">Usuarios</span>
              </a>

              <a href="settings.html" className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isActive('settings.html') ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'}`}>
                <div className="icon-settings text-xl"></div>
                <span className="font-medium">Configuraciones</span>
              </a>

              <a href="settings.html#customization" className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${isActive('settings.html#customization') ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] hover:text-[var(--text-main)]'}`}>
                <div className="icon-palette text-xl"></div>
                <span className="font-medium">Personalizar Interfaz</span>
              </a>

              <button onClick={logout} className="w-full flex items-center space-x-3 px-6 py-3 rounded-full hover:bg-red-50 text-red-600 transition-all duration-300 hover:scale-105 mt-8">
                <div className="icon-log-out text-xl"></div>
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </nav>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}
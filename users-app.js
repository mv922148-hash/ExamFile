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

function UserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in-up">
      <div className="glass-card w-full max-w-md p-8 relative animate-pop-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-card-hover)] transition-colors duration-300"
        >
          <div className="icon-x text-xl text-[var(--text-secondary)]"></div>
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6 group cursor-pointer" onClick={() => {
            const newAvatar = prompt('Ingrese la URL de la nueva imagen de perfil:', user.objectData.Avatar);
            if (newAvatar) {
              // In a real app, this would call an API. Here we just update the local object for display.
              user.objectData.Avatar = newAvatar;
              // Force update (in a real app, state would handle this)
              onClose();
              setTimeout(() => alert('Imagen actualizada (simulado). Recarga para ver cambios persistentes si usas mock data.'), 100);
            }
          }}>
            <img
              src={user.objectData.Avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'}
              alt={user.objectData.Name}
              className="w-32 h-32 rounded-full border-4 border-[var(--bg-card)] shadow-xl object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="icon-edit text-white text-2xl"></div>
            </div>
            <span className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white ${user.objectData.Role === 'superusuario' ? 'bg-purple-500' : user.objectData.Role === 'administrador' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
          </div>

          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">{user.objectData.Name}</h2>
          <p className="text-[var(--text-secondary)] mb-6">{user.objectData.Email}</p>

          <div className="w-full space-y-4">
            <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Rol</span>
              <span className="text-sm font-bold text-[var(--text-main)] capitalize">{user.objectData.Role}</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-secondary)]">Usuario</span>
              <span className="text-sm font-bold text-[var(--text-main)]">@{user.objectData.Username}</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-secondary)]">ID</span>
              <span className="text-sm font-mono text-[var(--text-muted)]">{user.objectId}</span>
            </div>
          </div>

          <div className="mt-8 w-full">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[var(--primary-color)] text-white font-medium hover:bg-[var(--secondary-color)] transition-colors duration-300 shadow-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersApp() {
  try {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filterRole, setFilterRole] = React.useState('all');
    const [selectedUser, setSelectedUser] = React.useState(null);
    const currentUser = requireAuth();

    if (!currentUser) return null;

    React.useEffect(() => {
      loadUsers();
    }, []);

    const loadUsers = async () => {
      try {
        setLoading(true);
        const result = await trickleListObjects('user', 100, true);
        setUsers(result.items);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    const filteredUsers = filterRole === 'all'
      ? users
      : users.filter(u => u.objectData.Role === filterRole);

    return (
      <div className="min-h-screen" data-name="users-app" data-file="users-app.js">
        <Topbar user={currentUser} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={currentUser} />

        {selectedUser && (
          <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}

        <div className={`pt-28 pb-8 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[var(--text-main)]">Usuarios</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterRole('all')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${filterRole === 'all' ? 'bg-[var(--primary-color)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterRole('superusuario')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${filterRole === 'superusuario' ? 'bg-[var(--primary-color)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  Superusuarios
                </button>
                <button
                  onClick={() => setFilterRole('administrador')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${filterRole === 'administrador' ? 'bg-[var(--primary-color)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  Administradores
                </button>
                <button
                  onClick={() => setFilterRole('usuario')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${filterRole === 'usuario' ? 'bg-[var(--primary-color)] text-white' : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  Usuarios
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user, index) => (
                  <div key={user.objectId} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <UserCard user={user} onViewProfile={setSelectedUser} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UsersApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <UsersApp />
    </ThemeProvider>
  </ErrorBoundary>
);
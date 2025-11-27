function LoginForm() {
  try {
    const [isRegistering, setIsRegistering] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('usuario');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        if (isRegistering) {
          // Registration Logic
          const userData = {
            Username: username,
            Password: password,
            Name: name,
            Email: email,
            Role: role,
            Avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
          };

          await trickleCreateObject('user', userData);

          // Auto login after register
          const user = await authenticateUser(username, password);
          if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
          }
        } else {
          // Login Logic
          const user = await authenticateUser(username, password);
          if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
          } else {
            setError('Usuario o contraseña incorrectos');
          }
        }
      } catch (err) {
        console.error(err);
        setError(isRegistering ? 'Error al registrar usuario' : 'Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className={`glass-card p-8 w-full max-w-md relative z-10 rounded-3xl animate-pop-in ${error ? 'animate-shake' : ''}`} data-name="login-form" data-file="components/LoginForm.js">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-[var(--primary-color)] bg-opacity-10 rounded-full flex items-center justify-center backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className={`text-4xl text-[var(--primary-color)] ${isRegistering ? 'icon-user-plus' : 'icon-shield-check'}`}></div>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-main)] mb-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{isRegistering ? 'Crear Cuenta' : 'Bienvenido'}</h1>
          <p className="text-[var(--text-secondary)] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>{isRegistering ? 'Completa tus datos para registrarte' : 'Ingresa tus credenciales para continuar'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <label className="block text-[var(--text-main)] text-sm font-medium mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input w-full rounded-2xl"
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <label className="block text-[var(--text-main)] text-sm font-medium mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full rounded-2xl"
                  placeholder="juan@ejemplo.com"
                  required
                />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <label className="block text-[var(--text-main)] text-sm font-medium mb-1">Rol</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="glass-input appearance-none cursor-pointer w-full rounded-2xl"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="administrador">Administrador</option>
                    <option value="superusuario">Super Usuario</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
                    <div className="icon-chevron-down"></div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="animate-fade-in-up" style={{ animationDelay: isRegistering ? '0.7s' : '0.4s' }}>
            <label className="block text-[var(--text-main)] text-sm font-medium mb-1">Usuario</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 icon-user text-xl text-[var(--text-muted)]"></div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="glass-input pl-10 w-full rounded-2xl"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: isRegistering ? '0.8s' : '0.5s' }}>
            <label className="block text-[var(--text-main)] text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 icon-lock text-xl text-[var(--text-muted)]"></div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input pl-10 w-full rounded-2xl"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-10 text-red-500 border border-red-500 border-opacity-20 rounded-2xl p-3 text-sm flex items-center animate-fade-in-up">
              <div className="icon-alert-circle mr-2"></div>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4 animate-fade-in-up"
            style={{ animationDelay: isRegistering ? '0.9s' : '0.6s' }}
          >
            {loading ? 'Procesando...' : (isRegistering ? 'Registrarse' : 'Ingresar')}
          </button>
        </form>

        <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: isRegistering ? '1.0s' : '0.7s' }}>
          <p className="text-[var(--text-secondary)] text-sm">
            {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="ml-2 text-[var(--primary-color)] font-semibold hover:underline focus:outline-none"
            >
              {isRegistering ? 'Inicia Sesión' : 'Regístrate'}
            </button>
          </p>
        </div>

        {!isRegistering && (
          <div className="mt-8 pt-6 border-t border-[var(--border-color)] animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-sm font-semibold text-[var(--text-main)] mb-3 text-center">Credenciales de Ejemplo</h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-purple-100 border border-purple-200 text-purple-800 flex justify-between items-center cursor-pointer hover:bg-purple-200 transition-colors" onClick={() => { setUsername('super1'); setPassword('super123'); }}>
                <span className="font-medium">Superusuario</span>
                <span className="opacity-75">super1 / super123</span>
              </div>
              <div className="p-2 rounded-xl bg-blue-100 border border-blue-200 text-blue-800 flex justify-between items-center cursor-pointer hover:bg-blue-200 transition-colors" onClick={() => { setUsername('admin1'); setPassword('admin123'); }}>
                <span className="font-medium">Administrador</span>
                <span className="opacity-75">admin1 / admin123</span>
              </div>
              <div className="p-2 rounded-xl bg-green-100 border border-green-200 text-green-800 flex justify-between items-center cursor-pointer hover:bg-green-200 transition-colors" onClick={() => { setUsername('user1'); setPassword('user123'); }}>
                <span className="font-medium">Usuario</span>
                <span className="opacity-75">user1 / user123</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}
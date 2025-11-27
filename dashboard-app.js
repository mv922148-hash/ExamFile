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

function DashboardApp() {
  try {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const user = requireAuth();

    if (!user) return null;

    return (
      <div className="min-h-screen" data-name="dashboard-app" data-file="dashboard-app.js">
        <Topbar user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className={`pt-28 pb-8 px-6 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--text-main)] mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <DashboardCard icon="users" title="Usuarios" value="156" change="+12%" color="blue" />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <DashboardCard icon="shopping-cart" title="Ventas" value="$45,231" change="+8%" color="blue" />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <DashboardCard icon="trending-up" title="Crecimiento" value="23.5%" change="+2.3%" color="blue" />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <DashboardCard icon="activity" title="Activos" value="89" change="+5%" color="blue" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <ChartCard title="Ventas Mensuales" type="line" />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                <ChartCard title="Distribución por Categoría" type="doughnut" />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <ChartCard title="Rendimiento Trimestral" type="bar" />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                <ChartCard title="Comparativa Anual" type="radar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <DashboardApp />
    </ThemeProvider>
  </ErrorBoundary>
);
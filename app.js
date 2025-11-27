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
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <button onClick={() => window.location.reload()} className="glass-button">
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" data-name="app" data-file="app.js">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl animate-float" style={{ top: '10%', left: '10%', borderRadius: '50%', filter: 'blur(64px)' }}></div>
          <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-20 blur-3xl animate-float" style={{ top: '60%', right: '10%', animationDelay: '1s', borderRadius: '50%', filter: 'blur(64px)' }}></div>
        </div>
        <LoginForm />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);
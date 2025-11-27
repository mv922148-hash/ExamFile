function ChartCard({ title, type }) {
  try {
    const chartRef = React.useRef(null);
    const chartInstanceRef = React.useRef(null);

    const { colors } = useTheme();

    React.useEffect(() => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const hexToRgba = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const data = type === 'line' || type === 'bar'
          ? {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Datos',
              data: [12, 19, 15, 25, 22, 30],
              backgroundColor: hexToRgba(colors.primary, 0.2),
              borderColor: colors.primary,
              borderWidth: 2,
              tension: 0.4
            }]
          }
          : type === 'doughnut'
            ? {
              labels: ['Categoría A', 'Categoría B', 'Categoría C'],
              datasets: [{
                data: [30, 45, 25],
                backgroundColor: [colors.primary, colors.secondary, colors.accent]
              }]
            }
            : {
              labels: ['Métrica 1', 'Métrica 2', 'Métrica 3', 'Métrica 4'],
              datasets: [{
                label: 'Serie 1',
                data: [65, 75, 70, 80],
                backgroundColor: hexToRgba(colors.primary, 0.2),
                borderColor: colors.primary
              }]
            };

        chartInstanceRef.current = new ChartJS(ctx, {
          type: type,
          data: data,
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: type === 'doughnut'
              }
            }
          }
        });
      }

      return () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    }, [type, colors]);

    return (
      <div className="glass-card p-6" data-name="chart-card" data-file="components/ChartCard.js">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--text-main)]">{title}</h3>
          <button className="p-2 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-secondary)] transition-colors duration-300">
            <div className="icon-more-vertical text-xl"></div>
          </button>
        </div>
        <div className="relative h-64 w-full">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ChartCard component error:', error);
    return null;
  }
}
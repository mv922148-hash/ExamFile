function DashboardCard({ icon, title, value, change, color, isPositive }) {
  try {
    return (
      <div className="glass-card p-6 hover:-translate-y-1 transition-transform duration-300" data-name="dashboard-card" data-file="components/DashboardCard.js">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-${color}-500 bg-opacity-10 text-${color}-600`}>
            <div className={`icon-${icon} text-2xl`}></div>
          </div>
          <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change}
            <div className={`icon-${isPositive ? 'trending-up' : 'trending-down'} ml-1`}></div>
          </span>
        </div>
        <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-[var(--text-main)]">{value}</p>
      </div>
    );
  } catch (error) {
    console.error('DashboardCard component error:', error);
    return null;
  }
}
function UserCard({ user, onViewProfile }) {
  try {
    const getRoleColor = (role) => {
      switch (role) {
        case 'superusuario': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'administrador': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'usuario': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const roleColorClass = getRoleColor(user.objectData.Role);

    return (
      <div className="glass-card p-6 flex flex-col items-center text-center relative group" data-name="user-card" data-file="components/UserCard.js">
        <div className="relative mb-4">
          <img
            src={user.objectData.Avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'}
            alt={user.objectData.Name}
            className="w-24 h-24 rounded-full border-4 border-[var(--bg-card)] shadow-lg object-cover"
          />
        </div>

        <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">{user.objectData.Name}</h3>
        <p className="text-sm text-[var(--text-secondary)] mb-3">{user.objectData.Email}</p>

        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColorClass}`}>
          {user.objectData.Role}
        </span>

        <div className="mt-6 w-full">
          <button
            onClick={() => onViewProfile(user)}
            className="w-full py-2 px-4 rounded-lg bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] font-medium text-sm transition-colors duration-300 shadow-md"
          >
            Ver Perfil
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UserCard component error:', error);
    return null;
  }
}
// Mock implementation of trickleListObjects for local development
const DEFAULT_USERS = [
    {
        objectId: 'user_1',
        objectData: {
            Username: 'super1',
            Password: 'super123',
            Name: 'Super Usuario',
            Role: 'superusuario',
            Avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Super',
            Email: 'super@example.com'
        }
    },
    {
        objectId: 'user_2',
        objectData: {
            Username: 'admin1',
            Password: 'admin123',
            Name: 'Administrador',
            Role: 'administrador',
            Avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
            Email: 'admin@example.com'
        }
    },
    {
        objectId: 'user_3',
        objectData: {
            Username: 'user1',
            Password: 'user123',
            Name: 'Usuario Normal',
            Role: 'usuario',
            Avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
            Email: 'user@example.com'
        }
    }
];

function getMockUsers() {
    const stored = localStorage.getItem('mock_users');
    if (!stored) {
        localStorage.setItem('mock_users', JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
    }
    return JSON.parse(stored);
}

window.trickleListObjects = async function (objectType, limit, count) {
    console.log(`[Mock] trickleListObjects called for ${objectType}`);

    if (objectType === 'user') {
        return {
            items: getMockUsers()
        };
    }

    return { items: [] };
};

window.trickleCreateObject = async function (objectType, data) {
    console.log(`[Mock] trickleCreateObject called for ${objectType}`, data);

    if (objectType === 'user') {
        const users = getMockUsers();
        const newUser = {
            objectId: `user_${Date.now()}`,
            objectData: data
        };
        users.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(users));
        return newUser;
    }
};

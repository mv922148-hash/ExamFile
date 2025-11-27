async function authenticateUser(username, password) {
  try {
    const users = await trickleListObjects('user', 100, true);
    
    const user = users.items.find(item => 
      item.objectData.Username === username && 
      item.objectData.Password === password
    );

    if (user) {
      return {
        id: user.objectId,
        username: user.objectData.Username,
        name: user.objectData.Name,
        role: user.objectData.Role,
        avatar: user.objectData.Avatar,
        email: user.objectData.Email
      };
    }

    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

function getCurrentUser() {
  const userStr = sessionStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  return user;
}
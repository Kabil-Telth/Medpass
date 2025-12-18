//content

const headers = {
    headers: {
        "Content-Type": 'application/json',
    }
}

const headers_content = () => {
  const token = localStorage.getItem(TOKEN_KEYS.access);
  return {
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${token}`
    }
  };
};

const TOKEN_KEYS = {
  access: 'access_token',
  refresh: 'refresh_token',
  role: 'role',
  userId: 'userId'
};

const setToken = ({ access, refresh, role, userId }) => {
  localStorage.setItem(TOKEN_KEYS.access, access);
  localStorage.setItem(TOKEN_KEYS.refresh, refresh);
  localStorage.setItem(TOKEN_KEYS.role, role);
  localStorage.setItem(TOKEN_KEYS.userId, userId)
};

const getToken = () => {
  return {
    access: localStorage.getItem(TOKEN_KEYS.access),
    refresh: localStorage.getItem(TOKEN_KEYS.refresh),
    role: localStorage.getItem(TOKEN_KEYS.role),
  };
}

const setUserDetails = (userDetails) => {
  localStorage.setItem('user_Details', JSON.stringify(userDetails) );
}

const getUserDetails = () => {
  return {
    userName: localStorage.getItem('user_Details') ? JSON.parse(localStorage.getItem('user_Details')) : '',
  };
}

const getRefreshToken = () => {
  return localStorage.getItem(TOKEN_KEYS.refresh);
}

const setRememberMe = (rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('remember_me', 'true');
  } else {
    localStorage.setItem('remember_me', 'false');
  }
}

const getRememberMe = () => {
  return localStorage.getItem('remember_me') === 'true';
}

const clearAllLocalStorage = () => {
  localStorage.clear();
}

export {
  headers,
  headers_content,
  setToken,
  TOKEN_KEYS,
  getToken,
  getRefreshToken,
  setRememberMe,
  getRememberMe,
  setUserDetails,
  getUserDetails,
  clearAllLocalStorage
};

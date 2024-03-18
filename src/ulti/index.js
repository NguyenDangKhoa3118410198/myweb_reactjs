export const deleteLocalStorage = () => {
   localStorage.removeItem('authToken');
   localStorage.removeItem('refreshToken');
   localStorage.removeItem('isAuthenticated');
   localStorage.removeItem('username');
   localStorage.removeItem('avatarUrl');
};

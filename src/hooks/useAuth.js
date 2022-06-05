import Cookies from 'universal-cookie';
const cookies = new Cookies();

const useAuth = () => {
  const checkAuth = () => {
    const token = cookies.get('token');
    if (token) {
      return { token, isAuthenticated: true };
    }
    return { token: null, isAuthenticated: false };
  };

  const saveAuth = (token) => {
    cookies.set('token', token, { path: '/', maxAge: 86400 });
  };

  const removeAuth = () => {
    cookies.remove('token', { path: '/' });
  };

  return { checkAuth, saveAuth, removeAuth };
};

export default useAuth;

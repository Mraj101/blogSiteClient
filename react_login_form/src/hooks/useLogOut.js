import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/newuser/logout');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { logout };
};

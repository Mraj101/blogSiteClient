import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogout = () => {
  const { setUsr } = useAuthContext();

  const logout = async () => {
    try {
      console.log("iniside log out");
      const response = await axios.post('http://localhost:8000/api/v1/newuser/logout');
      console.log(response,"logged out successfull");
      localStorage.removeItem('user');
      setUsr(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { logout };
};
